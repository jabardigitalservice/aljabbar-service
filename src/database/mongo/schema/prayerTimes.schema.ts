import mongoose, { Schema } from 'mongoose'

const schema = new Schema(
    {
        times: {
            type: Object,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
    }
)

export default mongoose.model('prayerTimes', schema, 'prayerTimes')
