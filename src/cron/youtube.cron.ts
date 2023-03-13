import config from '../config/config'
import Mongo from '../database/mongo/mongo'
import youtubeSchema from '../database/mongo/schema/youtube.schema'
import Youtube from '../external/youtube'
import Logger from '../pkg/logger'

const youtube = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)

    const youtube = new Youtube(config, logger)
    const search = await youtube.Search()

    for (const item of search.items) {
        const { snippet, id } = item
        const data = {
            video_id: id.videoId,
            title: snippet.title,
            description: snippet.description,
            thumbnail: `https://i.ytimg.com/vi/${id.videoId}/sddefault.jpg`,
            published_at: snippet.publishedAt,
        }
        await youtubeSchema.updateOne(
            {
                video_id: data.video_id,
            },
            data,
            {
                upsert: true,
            }
        )
    }

    process.exit()
}

export default youtube()
