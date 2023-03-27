import winston from 'winston'
import { Meta, PropPaginate } from '../../../helpers/paginate'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(
        private repository: Repository,
        private logger: winston.Logger
    ) {}

    public async FindAll(prop: PropPaginate) {
        const res = await this.repository.FindAll(prop)
        const count = await this.repository.Count()

        return {
            data: res,
            meta: Meta(prop, count),
        }
    }
}

export default Usecase
