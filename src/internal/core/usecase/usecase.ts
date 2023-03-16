import { DateTime } from 'luxon'
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

    private getFilters(query: FindAll) {
        let filters = {}

        if (query.start_date && query.end_date) {
            filters = Object.assign(filters, {
                date: {
                    $gte: query.start_date,
                    $lte: query.end_date,
                },
            })
        } else {
            filters = Object.assign(filters, {
                date: {
                    $gte: DateTime.now().plus({ days: 1 }).toISO(),
                },
            })
        }

        return filters
    }

    public async Activity(prop: PropPaginate, query: FindAll) {
        const filters = this.getFilters(query)
        const res = await this.repository.FindAll(prop, filters)
        const count = await this.repository.Count(filters)

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

        return res.payloads[0]
    }
}

export default Usecase
