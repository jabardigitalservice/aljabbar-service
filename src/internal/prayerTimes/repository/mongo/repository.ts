import winston from 'winston'
import prayerTimesSchema from '../../../../database/mongo/schema/prayerTimes.schema'

class Repository {
    private prayerTime = prayerTimesSchema
    constructor(private logger: winston.Logger) {}

    public async FindByDate(date: Date) {
        return this.prayerTime.findOne({ date })
    }
}

export default Repository
