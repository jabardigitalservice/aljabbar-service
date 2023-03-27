import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        id: {
            type: String,
            index: true,
        },
        domain: String,
        title: String,
        excerpt: String,
        content: String,
        slug: String,
        category: String,
        thumbnail: String,
        unit: String,
        url: String,
        highlight: Object,
        published_at: {
            type: Date,
            index: true,
        },
        created_at: Date,
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('news', schema, 'news')
