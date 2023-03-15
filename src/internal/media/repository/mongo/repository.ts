import winston from 'winston'
import youtubeSchema from '../../../../database/mongo/schema/youtube.schema'
import { PropPaginate } from '../../../../helpers/paginate'

class Repository {
    private youtube = youtubeSchema
    constructor(private logger: winston.Logger) {}

    public async FindAll({ limit, offset }: PropPaginate) {
        return this.youtube.find().skip(offset).limit(limit)
    }

    public async Count() {
        return this.youtube.count()
    }
}

export default Repository
