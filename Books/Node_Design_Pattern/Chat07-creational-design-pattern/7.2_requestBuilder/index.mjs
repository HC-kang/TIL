import RequestBuilder from './requestBuilder.mjs';

const builder = new RequestBuilder();

console.log('RequestBuilder start');
builder
  .setMethod('GET')
  .setUrl('https://www.google.com')
  .setQuery({})
  .setHeaders(null)
  .invoke()
  .then(console.log)
  .catch(console.error);
console.log('RequestBuilder end')