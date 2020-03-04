#!/usr/bin/env node

/**
 * Module dependencies.
 */

import 'dotenv/config';
import App from '../app';
import debuger from 'debug';
import http from 'http';
import socket from 'socket.io';

const debug = debuger('expressjs-mvc:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.APP_PORT || '3000');
App.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(App);
const io = socket(server);

io.on('connection', onConnection);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, process.env.APP_HOST || '0.0.0.0');
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log('EACCES');
      console.log(error);
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log('EADDRINUSE');
      console.log(error);
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      console.log('EADDRINUSE');
      console.log(error);
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log(`✅  The server is listen on ${bind}`); // eslint-disable-line no-console
}


function onConnection(socket) {
  console.log('a user connected');
  console.log(this);
  console.log(io)
  io.emit('message', 'Hello wWrld!');

  socket.on('disconnect', () => {
    console.log('a user go out');
  });

}