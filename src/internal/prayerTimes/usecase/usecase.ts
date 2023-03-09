import winston from 'winston'
import { Translate } from '../../../helpers/translate'
import error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(
        private repository: Repository,
        private logger: winston.Logger
    ) {}

    public async FindByDate(date: Date) {
        const item = await this.repository.FindByDate(date)

        if (!item)
            throw new error(statusCode.NOT_FOUND, Translate('not_found', {}))

        return item
    }
}

export default Usecase
