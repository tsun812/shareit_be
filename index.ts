const { Server } = require('socket.io')
const http = require('http');
const express = require('express');
const app = express()
const server = http.createServer(app);

interface ServerToClientEvents {
  'receive-changes': (delta: any) => void,
  'load-document': (delta: any) => void
}

interface ClientToServerEvents {
  'send-changes': any,
  'get-document': any
}
const io = new Server(server, {cors: {
  origin: 'http://localhost:3000',
  method: ['GET', 'POST']
}})

io.on('connection', (socket: any) => {
    socket.on('get-document', async(documentId: string) => {
      socket.join(documentId)
      io.to(documentId).emit('load-document', 'asdf')

      socket.on('send-changes', (delta: any) => {
          socket.to(documentId).emit('receive-changes', delta)
      })
    })
})

server.listen(3001)