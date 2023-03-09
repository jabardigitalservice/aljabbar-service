import Joi from 'joi'

export const FindByDate = Joi.object({
    date: Joi.string().isoDate().required(),
})
