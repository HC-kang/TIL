const Request = require('./request');
const crypto = require('crypto');

function parseRequest(data) {
  const temp = data.toString().split('\r\n');
  const firstLine = temp[0].split(' ');
  const { path, params } = parseUrl(firstLine[1]);

  const request = new Request({
    method: firstLine[0],
    path: path,
    params: params,
    version: firstLine[2],
    body: temp[temp.length - 1],
  });

  for (let i = 1; i < temp.length - 2; i++) {
    const [key, value] = temp[i].split(': ');
    request.headers[key] = value;
  }
  return request;
}

function parseUrl(url) {
  if (!url) throw new TypeError('invalid argument');

  const [path, queryString] = url.split('?');
  const params = {};
  if (queryString) {
    queryString.split('&').forEach((element) => {
      const [key, value] = element.split('=');
      params[key] = value;
    });
  }
  return { path, params };
}

function genEtag(data, isWeak = false) {
  if (isWeak && typeof isWeak !== 'boolean') {
    throw new TypeError('invalid argument');
  }

  const hash = crypto
    .createHash('sha1')
    .update(data, 'utf8')
    .digest('base64')
    .substring(0, 27);

  const len =
    typeof data === 'string' ? Buffer.byteLength(data, 'utf8') : data.length;

  const tag = '"' + len.toString(16) + '-' + hash + '"';

  return isWeak ? 'W/' + tag : tag;
}

function isMatch(routePath, request) {
  const requestPath = request.path;
  if (routePath === requestPath) return true;
  const routePathArr = routePath.split('/');
  const requestPathArr = requestPath.split('/');
  if (routePathArr.length !== requestPathArr.length) return false;

  request.params = {};
  for (let i = 0; i < routePathArr.length; i++) {
    if (routePathArr[i] === requestPathArr[i]) continue;
    if (routePathArr[i].startsWith(':')) {
      const paramName = routePathArr[i].substring(1);
      request.params[paramName] = requestPathArr[i];
      continue;
    }
    return false;
  }
  return true;
}

module.exports = {
  parseRequest,
  genEtag,
  isMatch,
};