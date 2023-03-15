import { NextFunction, Response } from 'express'
import winston from 'winston'
import Usecase from '../../usecase/usecase'
import statusCode from '../../../../pkg/statusCode'
import { Paginate } from '../../../../helpers/paginate'

class Handler {
    constructor(private usecase: Usecase, private logger: winston.Logger) {}
    public Banner() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const result = await this.usecase.Banner()
                return res.status(statusCode.OK).json({
                    data: result,
                })
            } catch (error) {
                return next(error)
            }
        }
    }
    public Activity() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const paginate = Paginate(req.query)

                const result = await this.usecase.Activity(paginate)
                return res.status(statusCode.OK).json(result)
            } catch (error) {
                return next(error)
            }
        }
    }
    public ActivityByID() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const result = await this.usecase.ActivityByID(
                    req.params.id,
                    req.params.idPayload
                )
                return res.status(statusCode.OK).json({
                    data: result,
                })
            } catch (error) {
                return next(error)
            }
        }
    }
}

export default Handler
