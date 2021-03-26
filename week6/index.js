const promBundle = require("express-prom-bundle");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const metricsMiddleware = promBundle({
  includePath: true,
  includeStatusCode: true,
  normalizePath: true,
  promClient: {
    collectDefaultMetrics: {},
  }
});

app.use(metricsMiddleware);

const client = require("prom-client");
const gauge = new client.Gauge({ name: 'number_of_clients', help: 'Number of client connected' });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  gauge.inc(1);
  console.log('User connected');


  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    gauge.dec(1);
    console.log('User disconnected');
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
