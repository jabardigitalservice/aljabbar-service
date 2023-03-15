import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        date: Date,
        payloads: Array,
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('activities', schema, 'activities')
