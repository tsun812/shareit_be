import {Schema, model} from 'mongoose'

const DocumentSchema = new Schema({
    _id: String,
    data: Object,
    lastAccessTime: { type: Date, default: Date.now },
})

export default model('DocumentSchema', DocumentSchema)