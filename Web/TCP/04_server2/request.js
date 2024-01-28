function Request(options) {
  options = {
    method: 'GET',
    path: '/',
    version: 'HTTP/1.1',
    headers: {},
    body: '',
    params: {},
    query: {},
    ...options,
  };
  this.method = options.method;
  this.path = options.path;
  this.version = options.version;
  this.headers = options.headers;
  this.body = options.body;
  this.params = options.params;
  this.query = options.query;
}

module.exports = Request;
