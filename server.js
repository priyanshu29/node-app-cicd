const http = require('http');
const client = require('prom-client');

// Create a Registry to register metrics
const register = new client.Registry();

// Optional: Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metric example
const counter = new client.Counter({
  name: 'node_app_requests_total',
  help: 'Total number of requests',
});
register.registerMetric(counter);

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(register.metrics());
  } else {
    counter.inc(); // Increment the counter
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node.js App!\n');
  }
});

// Listen on all interfaces
server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:3000');
});