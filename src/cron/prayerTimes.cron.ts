import config from '../config/config'
import PrayerTimes from '../external/prayerTimes'
import Logger from '../pkg/logger'
import { DateTime } from 'luxon'
import { ConvertTimestampToISODate } from '../helpers/date'
import prayerTimesSchema from '../database/mongo/schema/prayerTimes.schema'
import Mongo from '../database/mongo/mongo'

const prayerTimes = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)

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
                timings: prayerTimes.FormatTimings(item.timings, '(WIB)'),
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

export default prayerTimes()
