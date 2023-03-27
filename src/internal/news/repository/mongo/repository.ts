import winston from 'winston'
import newsSchema from '../../../../database/mongo/schema/news.schema'
import { PropPaginate } from '../../../../helpers/paginate'

class Repository {
    private news = newsSchema
    constructor(private logger: winston.Logger) {}

    async FindAll({ limit, offset }: PropPaginate) {
        return this.news.find().limit(limit).skip(offset).sort({
            published_at: -1,
        })
    }

    async Count() {
        return this.news.count()
    }
}

export default Repository
