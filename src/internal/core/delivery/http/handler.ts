import { NextFunction, Response } from 'express'
import winston from 'winston'
import Usecase from '../../usecase/usecase'
import statusCode from '../../../../pkg/statusCode'
import {
    ValidateFormRequest,
} from '../../../../helpers/validate'
import { Activity } from '../../entity/schema'

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
                const value = ValidateFormRequest(Activity, req.query)
                const result = await this.usecase.Activity(value)
                return res.status(statusCode.OK).json({
                    data: result,
                })
            } catch (error) {
                return next(error)
            }
        }
    }
    public ActivityByID() {
        return async (req: any, res: Response, next: NextFunction) => {
            try {
                const result = await this.usecase.ActivityByID(req.params.id)
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
