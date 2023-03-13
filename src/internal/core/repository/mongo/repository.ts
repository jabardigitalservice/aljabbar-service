import winston from 'winston'
import activitySchema from '../../../../database/mongo/schema/activity.schema'
import bannerSchema from '../../../../database/mongo/schema/banner.schema'

class Repository {
    private banner = bannerSchema
    private activity = activitySchema
    constructor(private logger: winston.Logger) {}

    public Banner() {
        return this.banner.find()
    }

    public Activity(start_date: string, end_date: string) {
        return this.activity.find({
            tanggal_kegiatan: {
                $gte: start_date,
                $lt: end_date,
            },
        })
    }

    public ActivityById(id: string) {
        return this.activity.find({
            id,
        })
    }
}

export default Repository
