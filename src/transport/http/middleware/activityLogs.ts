import { Request } from 'express'
import { DateTime } from 'luxon'
import winston from 'winston'
import statusCode from '../../../pkg/statusCode'

export const activityLogs = (logger: winston.Logger) => {
    return (req: Request, res: any, next: any) => {
        const startTime = DateTime.now()
        next()
        const endTime = DateTime.now()
        const diff = endTime.diff(startTime)

        const additional_info = {
            http_uri: req.originalUrl,
            http_host: req.protocol + '://' + req.headers.host,
            http_method: req.method,
            http_scheme: req.protocol,
            remote_addr: req.httpVersion,
            user_agent: req.headers['user-agent'],
            tz: DateTime.now().toBSON(),
            duration: diff + 'ms',
            code: res.statusCode,
        }

        const message = statusCode[res.statusCode] as string

        logger.info(message, {
            additional_info,
        })
    }
}
