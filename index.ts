import { Server, Socket} from 'socket.io';
import http from 'http';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import DocumentSchema from './DocumentSchema';

const app: Express = express()
const server: http.Server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/shareit');
mongoose.set('debug', true);
interface ServerToClientEvents {
  'receive-changes': (delta: object) => void,
  'load-document': (delta: object) => void,
}

interface ClientToServerEvents {
  'send-changes': (delta: object) => void,
  'get-document': (id: string) => void,
  'save-changes': (delta: object) => void,
}
const io: Server<ClientToServerEvents, ServerToClientEvents>= new Server(server, {cors: {
  origin: 'http://localhost:3000'
}})

io.on('connection', (socket: Socket) => {
  socket.on('get-document', async (documentId: string) => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    if(document){
      io.to(documentId).emit('load-document', document.data)
    }
    socket.on('send-changes', (delta: object) => {
      socket.to(documentId).emit('receive-changes', delta)
    })

    socket.on('save-changes', async (document: object) => {
      await DocumentSchema.findByIdAndUpdate(documentId, {data: document, lastAccessTime: Date.now()})
    })
  })
})

const findOrCreateDocument = async (id: string) => {
  if(id == null) return
  const document = await DocumentSchema.findById(id)
  if(document){
    return document
  }
  else {
    return await DocumentSchema.create({_id: id, data: '', lastAccessTime: Date.now()})
  }
}

server.listen(3001)