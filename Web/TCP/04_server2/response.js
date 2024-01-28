function Response(options) {
  options = {
    version: 'HTTP/1.1',
    statusCode: 200,
    statusMessage: 'OK',
    headers: {},
    body: '',
    ...options,
  };
  this.version = options.version;
  this.statusCode = options.statusCode;
  this.statusMessage = options.statusMessage;
  this.headers = options.headers;
  this.body = options.body;
  this.handled = false;

  this.toString = () => {
    const headers = Object.entries(this.headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\r\n');
    return `${this.version} ${this.statusCode} ${this.statusMessage}\r\n${headers}\r\n\r\n${this.body}`;
  };
}

module.exports = Response;
