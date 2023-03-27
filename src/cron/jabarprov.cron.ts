import config from '../config/config'
import Mongo from '../database/mongo/mongo'
import newsSchema from '../database/mongo/schema/news.schema'
import Jabarprov from '../external/jabarprov'
import Logger from '../pkg/logger'

const jabarprov = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)

    const jabarprov = new Jabarprov(config, logger)

    const search = await jabarprov.Search(1, 10)

    for (const data of search.data) {
        await newsSchema.updateOne(
            {
                id: data.id,
            },
            {
                ...data,
                excerpt: data.excerpt.replace('\n', ''),
            },
            {
                upsert: true,
            }
        )
    }

    process.exit()
}

export default jabarprov()
