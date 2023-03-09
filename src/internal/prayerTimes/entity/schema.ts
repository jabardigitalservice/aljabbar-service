import Joi from 'joi'

export const FindByDate = Joi.string().isoDate().required()
