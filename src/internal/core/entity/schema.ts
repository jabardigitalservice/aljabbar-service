import Joi from 'joi'

export const Activity = Joi.object({
    page: Joi.number().required(),
    limit: Joi.number().required(),
})
