import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {},
    {
        versionKey: false,
        strict: false,
    }
)

export default mongoose.model('banners', schema, 'banners')
