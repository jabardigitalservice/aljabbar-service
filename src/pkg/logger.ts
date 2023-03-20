import winston, { createLogger, format, transports } from 'winston'
import { Config } from '../config/config.interface'
import newrelicFormatter from '@newrelic/winston-enricher'

class Logger {
    public logger: winston.Logger

    constructor(config: Config) {
        const newrelicWinstonFormatter = newrelicFormatter(winston)

        this.logger = createLogger({
            level: config.app.log,
            format: format.combine(newrelicWinstonFormatter()),
            transports: [new transports.Console()],
        })
    }
}

export default Logger
