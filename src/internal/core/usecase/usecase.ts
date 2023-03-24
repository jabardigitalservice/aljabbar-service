import winston from 'winston'
import { Meta, PropPaginate } from '../../../helpers/paginate'
import error from '../../../pkg/error'
import statusCode from '../../../pkg/statusCode'
import { FindAll } from '../entity/interface'
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

    public async Activity(prop: PropPaginate, query: FindAll) {
        const res = await this.repository.FindAll(prop, query)
        const count = await this.repository.Count(query)

        return {
            data: res,
            meta: Meta(prop, count),
        }
    }

    public async ActivityByID(id: string) {
        const res = await this.repository.ActivityById(id)

        if (!res) {
            throw new error(
                statusCode.NOT_FOUND,
                statusCode[statusCode.NOT_FOUND]
            )
        }

        return res.payloads.find((item) => item.id === id)
    }
}

export default Usecase
