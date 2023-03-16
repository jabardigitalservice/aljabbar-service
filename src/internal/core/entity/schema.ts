import Joi from 'joi'

export const FindAll = Joi.object({
    isToday: Joi.boolean().optional(),
})
