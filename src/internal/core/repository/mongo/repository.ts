import winston from 'winston'
import activitySchema from '../../../../database/mongo/schema/activity.schema'
import bannerSchema from '../../../../database/mongo/schema/banner.schema'
import { PropPaginate } from '../../../../helpers/paginate'

class Repository {
    private banner = bannerSchema
    private activity = activitySchema
    constructor(private logger: winston.Logger) {}

    public Banner() {
        return this.banner.find()
    }

    public FindAll({ limit, offset }: PropPaginate, filters: Object) {
        return this.activity.find(filters).skip(offset).limit(limit)
    }

    public Count(filters: Object) {
        return this.activity.find(filters).count()
    }

    public ActivityById(id: string) {
        return this.activity.findOne({
            'payloads.id': id,
        })
    }
}

export default Repository
