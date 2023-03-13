import winston from 'winston'
import error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'
import { Activity } from '../entity/interface'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(
        private repository: Repository,
        private logger: winston.Logger
    ) {}

    public async Banner() {
        const res = await this.repository.Banner()

        return res
    }

    public async Activity({ start_date, end_date }: Activity) {
        const res = await this.repository.Activity(start_date, end_date)

        return res
    }

    public async ActivityByID(id: string) {
        const res = await this.repository.ActivityById(id)

        if (!res) {
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        return res
    }
}

export default Usecase
