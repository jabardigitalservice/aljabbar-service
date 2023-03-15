import winston from 'winston'
import activitySchema from '../../../../database/mongo/schema/activity.schema'
import bannerSchema from '../../../../database/mongo/schema/banner.schema'
import { GetRangeDaysOfMonth } from '../../../../helpers/date'
import { PropPaginate } from '../../../../helpers/paginate'

class Repository {
    private banner = bannerSchema
    private activity = activitySchema
    constructor(private logger: winston.Logger) {}

    public Banner() {
        return this.banner.find()
    }

    public FindAll({ limit, page }: PropPaginate) {
        return this.activity.find().limit(limit).skip(page)
    }

    public Count() {
        return this.activity.count()
    }

    public ActivityById(id: string) {
        return this.activity.findById(id)
    }
}

export default Repository
