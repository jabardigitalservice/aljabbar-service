import { NextFunction, Request, Response } from 'express'
import winston from 'winston'
import Usecase from '../../usecase/usecase'
import { FindByDate } from '../../entity/schema'
import { ValidateParams } from '../../../../helpers/validate'
import statusCode from '../../../../pkg/statusCode'

class Handler {
    constructor(private usecase: Usecase, private logger: winston.Logger) {}
    public FindByDate() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const value = ValidateParams(FindByDate, req.params.date)

                const result = await this.usecase.FindByDate(value)
                return res.status(statusCode.OK).json({ data: result })
            } catch (error) {
                return next(error)
            }
        }
    }
}

export default Handler
