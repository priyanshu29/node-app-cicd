const http = require('http');
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const counter = new client.Counter({
  name: 'node_app_requests_total',
  help: 'Total number of requests',
});
register.registerMetric(counter);

const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    console.log('Received /metrics request');
    try {
      const metrics = await register.metrics();
      console.log(`Metrics length: ${metrics.length}`);
      res.setHeader('Content-Type', register.contentType);
      res.end(metrics);
    } catch (error) {
      console.error('Error generating metrics:', error);
      res.statusCode = 500;
      res.end('Error generating metrics');
    }
  } else {
    counter.inc();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node.js App!\n');
  }
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:3000');
});
