import Joi from 'joi'

export const FindAll = Joi.object({
    start_date: Joi.string().isoDate().optional(),
    end_date: Joi.string().isoDate().optional(),
    isNextActivities: Joi.boolean().optional(),
})
