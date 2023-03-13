import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        video_id: {
            type: String,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        published_at: {
            type: Date,
            required: true,
            index: true,
        },
        duration: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('youtube', schema, 'youtubes')
