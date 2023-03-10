import dotenv from 'dotenv'
import { Config } from './config.interface'
import configValidate from './config.validate'

dotenv.config()

const env = configValidate(process.env)

const config: Config = {
    app: {
        name: env.APP_NAME,
        env: env.APP_ENV,
        port: {
            http: env.APP_PORT_HTTP,
        },
        log: env.APP_LOG,
    },
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        name: env.DB_NAME,
        auth_source: env.DB_AUTH_SOURCE,
    },
    jwt: {
        access_key: env.JWT_ACCESS_SECRET,
        algorithm: env.JWT_ALGORITHM,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        ttl: env.REDIS_TTL,
    },
    prayerTimes: {
        url: env.PRAYER_TIMES_URL,
        longitude: env.PRAYER_TIMES_LONGITUDE,
        latitude: env.PRAYER_TIMES_LATITUDE,
    },
    jabarprov: {
        url: env.JABARPROV_URL,
        keyword: env.JABARPROV_KEYWORD,
    },
    coreData: {
        url: env.CORE_DATA_URL,
    },
}

export default config
