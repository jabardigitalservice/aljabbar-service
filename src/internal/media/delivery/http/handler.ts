import { NextFunction, Request, Response } from 'express'
import winston from 'winston'
import Usecase from '../../usecase/usecase'
import statusCode from '../../../../pkg/statusCode'

class Handler {
    constructor(private usecase: Usecase, private logger: winston.Logger) {}
    public FindAll() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await this.usecase.FindAll()
                return res.status(statusCode.OK).json({ data: result })
            } catch (error) {
                return next(error)
            }
        }
    }
}

export default Handler
