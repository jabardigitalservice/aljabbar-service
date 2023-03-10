import Joi from 'joi'

export default Joi.object({
    APP_NAME: Joi.string().required(),
    APP_ENV: Joi.string()
        .valid('local', 'staging', 'production')
        .default('local'),
    APP_PORT_HTTP: Joi.number().required(),
    APP_PORT_GRPC: Joi.number().optional(),
    APP_LOG: Joi.string().valid('info', 'error', 'warn').required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_AUTH_SOURCE: Joi.string().optional(),
    REDIS_HOST: Joi.string().optional(),
    REDIS_PORT: Joi.number().optional(),
    REDIS_TTL: Joi.number().optional(),
    PRAYER_TIMES_URL: Joi.string().uri().required(),
    PRAYER_TIMES_LONGITUDE: Joi.number().required(),
    PRAYER_TIMES_LATITUDE: Joi.number().required(),
    JABARPROV_URL: Joi.string().uri().required(),
    JABARPROV_KEYWORD: Joi.string().required(),
    CORE_DATA_URL: Joi.string().uri().required(),
    YOUTUBE_API_URL: Joi.string().uri().required(),
    YOUTUBE_API_KEY: Joi.string().required(),
    YOUTUBE_CHANNEL_ID: Joi.string().required(),
})
