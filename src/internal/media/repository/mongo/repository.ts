import winston from 'winston'
import youtubeSchema from '../../../../database/mongo/schema/youtube.schema'

class Repository {
    private youtube = youtubeSchema
    constructor(private logger: winston.Logger) {}

    public async FindAll() {
        return this.youtube.find()
    }
}

export default Repository
