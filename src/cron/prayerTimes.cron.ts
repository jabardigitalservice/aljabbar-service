import config from '../config/config'
import PrayerTimes from '../external/prayerTimes'
import Logger from '../pkg/logger'
import { DateTime } from 'luxon'
import { ConvertTimestampToISODate } from '../helpers/date'
import prayerTimesSchema from '../database/mongo/schema/prayerTimes.schema'
import Mongo from '../database/mongo/mongo'

export default async () => {
    const { logger } = new Logger(config)
    Mongo.connect(logger, config)

    const prayerTimes = new PrayerTimes(config, logger)
    const today = DateTime.now()
    const calendarByCity = await prayerTimes.CalenderByCity(
        today.year,
        today.month,
        config.prayerTimes.location
    )

    for (const item of calendarByCity) {
        await prayerTimesSchema.updateOne(
            {
                location: config.prayerTimes.location,
                date: ConvertTimestampToISODate(item.date.timestamp),
            },
            {
                timings: formatTimings(item.timings),
                location: config.prayerTimes.location,
                date: ConvertTimestampToISODate(item.date.timestamp),
            },
            {
                upsert: true,
            }
        )
    }

    process.exit()
}

const formatTimings = (timings: any) => {
    for (const key in timings) {
        if (Object.prototype.hasOwnProperty.call(timings, key)) {
            const element = timings[key]
            timings[key] = element.replace(' (WIB)', '')
        }
    }

    return timings
}
