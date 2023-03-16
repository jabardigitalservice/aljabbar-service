import Joi from 'joi'

export const FindAll = Joi.object({
    is_today: Joi.boolean().optional(),
})
