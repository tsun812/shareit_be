import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import DocumentSchema from './DocumentSchema';
//import DocumentSchema  from "./DocumentSchema";
const app = express()
const server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/shareit');
mongoose.set('debug', true);
interface ServerToClientEvents {
  'receive-changes': (delta: any) => void,
  'load-document': (delta: any) => void
}

interface ClientToServerEvents {
  'send-changes': any,
  'get-document': any
}
const io = new Server(server, {cors: {
  origin: 'http://localhost:3000'
}})

io.on('connection', (socket: any) => {
    socket.on('get-document', async (documentId: string) => {
      const document = await findOrCreateDocument(documentId)
      socket.join(documentId)
      if(document){
        io.to(documentId).emit('load-document', document.data)
      }
      socket.on('send-changes', (delta: any) => {
        socket.to(documentId).emit('receive-changes', delta)
      })

      socket.on('save-changes', async (delta: any) => {
        await DocumentSchema.findByIdAndUpdate(documentId, {data: delta})
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
    return await DocumentSchema.create({_id: id, data: ''})
  }
}

server.listen(3001)