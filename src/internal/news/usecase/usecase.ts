import winston from 'winston'
import Jabarprov from '../../../external/jabarprov'
import { PropPaginate } from '../../../helpers/paginate'

class Usecase {
    constructor(private jabarprov: Jabarprov, private logger: winston.Logger) {}

    public async FindAll({ limit, page }: PropPaginate) {
        const res = await this.jabarprov.Search(page, limit)

        return res
    }
}

export default Usecase
