import { DateTime } from 'luxon'
import winston from 'winston'
import activitySchema from '../../../../database/mongo/schema/activity.schema'
import bannerSchema from '../../../../database/mongo/schema/banner.schema'
import { PropPaginate } from '../../../../helpers/paginate'
import { FindAll } from '../../entity/interface'

class Repository {
    private banner = bannerSchema
    private activity = activitySchema
    constructor(private logger: winston.Logger) {}

    public Banner() {
        return this.banner.find()
    }

    private getFilters(query: FindAll) {
        let filters = {}

        const date = DateTime.fromISO(query.date).toISODate()

        if (query.is_today) {
            filters = Object.assign(filters, {
                date: new Date(date),
            })
        } else {
            filters = Object.assign(filters, {
                date: {
                    $gt: new Date(date),
                },
            })
        }

        return filters
    }

    public FindAll({ limit, offset }: PropPaginate, query: FindAll) {
        const filters = this.getFilters(query)
        return this.activity
            .find(filters)
            .sort({
                date: 1,
            })
            .skip(offset)
            .limit(limit)
    }

    public Count(query: FindAll) {
        const filters = this.getFilters(query)
        return this.activity.find(filters).count()
    }

    public ActivityById(id: string) {
        return this.activity.findOne({
            'payloads.id': id,
        })
    }
}

export default Repository
