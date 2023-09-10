import http from 'http';
import url from 'url';

export default class RequestBuilder {
  setMethod = (method) => {
    this.method = method;
    return this;
  };

  setUrl = (urlPath) => {
    this.urlString = new url.URL(urlPath);
    return this;
  };

  setHeaders = (headers) => {
    this.headers = headers;
    return this;
  };

  setHeaders = (headers) => {
    this.headers = headers;
    return this;
  };

  setQuery = (query) => {
    for (const [key, value] of Object.entries(query)) {
      this.urlString.searchParams.append(key, value);
    }
    return this;
  };

  setBody = (body) => {
    this.body = body;
    return this;
  };

  invoke = () => {
    return new Promise((resolve, reject) => {
      const options = {
        method: this.method,
        hostname: this.urlString.hostname,
        port: this.urlString.port,
        path: this.urlString.pathname + this.urlString.search,
        headers: this.headers,
      };

      const req = http
        .request(options, (res) => {
          let data = '';

          res
            .on('data', (chunk) => {
              data += chunk;
            })
            .on('end', () => {
              resolve(data);
            });
          console.log(data);
        })
        .on('error', (err) => {
          reject(err);
        });
      if (this.body) req.write(this.body);
      req.end();
    });
  };
}
