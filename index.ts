const { Server } = require('socket.io')
const http = require('http');
const express = require('express');
const app = express()
const server = http.createServer(app);
server.listen(3001)
interface ServerToClientEvents {
    'receive-changes': (delta: any) => void
  }
  
interface ClientToServerEvents {
    'send-changes': (delta: any) => void
}

interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }
  
const io = new Server(server, {cors: {
  origin: 'http://localhost:3000',
  method: ['GET', 'POST']
}})

io.on('connection', (socket: any) => {
    socket.on('send-changes', (delta: any) => {
        socket.broadcast.emit('receive-changes', delta)
    })
})