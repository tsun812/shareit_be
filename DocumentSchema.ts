import {Schema, model} from 'mongoose'

const DocumentSchema = new Schema({
    _id: String,
    data: Object,
    lastAccessTime: { type: Date, expires: 60 * 60 * 24 * 7 },
})

export default model('DocumentSchema', DocumentSchema)