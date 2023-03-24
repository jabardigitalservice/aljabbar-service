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

        if (query.is_today) {
            const today = DateTime.now().toISODate()
            filters = Object.assign(filters, {
                date: new Date(today),
            })
        } else {
            filters = Object.assign(filters, {
                date: {
                    $gte: new Date(
                        DateTime.now().plus({ days: 1 }).toISODate()
                    ),
                },
            })
        }

        return filters
    }

    public FindAll({ limit, offset }: PropPaginate, query: FindAll) {
        const filters = this.getFilters(query)
        return this.activity.find(filters).skip(offset).limit(limit)
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
