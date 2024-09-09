const http = require('http')
const url = require('url')
const client = require('prom-client')

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'example-nodejs-app'
})

// Enable the collection of default metrics
client.collectDefaultMetrics({ register })

// Define the HTTP server
const server = http.createServer(async (req, res) => {
  // Retrieve route from request object
  const route = url.parse(req.url).pathname

  if (route === '/metrics') {
    // Return all metrics in the Prometheus exposition format
    res.setHeader('Content-Type', register.contentType)
    try {
      const metrics = await register.metrics()
      res.end(metrics)
    } catch (err) {
      res.statusCode = 500
      res.end(err.message)
    }
  }
})

// Start the HTTP server which exposes the metrics on http://localhost:3000/metrics
server.listen(3000)
