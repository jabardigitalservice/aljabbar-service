import Joi from 'joi'
import { DateTime } from 'luxon'

export const FindAll = Joi.object({
    is_today: Joi.boolean().optional(),
    date: Joi.string()
        .isoDate()
        .default(DateTime.now().toBSON().toISOString())
        .optional(),
})
