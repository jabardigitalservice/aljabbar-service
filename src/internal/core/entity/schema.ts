import Joi from 'joi'

export const Activity = Joi.object({
    start_date: Joi.string().isoDate().required(),
    end_date: Joi.string().isoDate().required(),
})
