import winston from 'winston'
import { Meta, PropPaginate } from '../../../helpers/paginate'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(
        private repository: Repository,
        private logger: winston.Logger
    ) {}

    public async FindAll(propPaginate: PropPaginate) {
        const data = await this.repository.FindAll(propPaginate)
        const count = await this.repository.Count()

        return {
            data,
            meta: Meta(propPaginate, count),
        }
    }
}

export default Usecase
