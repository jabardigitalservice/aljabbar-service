import config from './config/config'
import Mongo from './database/mongo/mongo'
import Core from './internal/core/core'
import News from './internal/news/news'
import PrayerTime from './internal/prayerTimes/prayerTimes'
import Media from './internal/media/media'
import Logger from './pkg/logger'
import Redis from './pkg/redis'
import Http from './transport/http/http'

const main = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)
    const redis = new Redis(config, logger)
    const http = new Http(logger, config)

    // Load App Internal
    new PrayerTime(http, logger, config)
    new News(http, logger, config)
    new Core(http, logger, config)
    new Media(http, logger, config)

    if (config.app.env !== 'test') {
        http.Run(config.app.port.http)
    }

    return {
        http,
    }
}

export default main()
