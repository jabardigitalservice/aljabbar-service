import winston from 'winston'
import { Meta, PropPaginate } from '../../../helpers/paginate'
import error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'
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

    public async Activity(prop: PropPaginate) {
        const res = await this.repository.FindAll(prop)
        const count = await this.repository.Count()

        return {
            data: res,
            meta: Meta(prop, count),
        }
    }

    public async ActivityByID(id: string, idPayload: string) {
        let res = await this.repository.ActivityById(id)

        if (!res) {
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        res = res.payloads.find((item) => item.id === idPayload)

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
