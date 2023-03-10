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
    const calendar = await prayerTimes.Calender(today.year, today.month)

    for (const item of calendar) {
        const date = ConvertTimestampToISODate(item.date.timestamp)
        await prayerTimesSchema.updateOne(
            {
                date,
            },
            {
                times: prayerTimes.FormatTimes(item.timings, '+07:00 (WIB)'),
                date,
            },
            {
                upsert: true,
            }
        )
    }

    process.exit()
}

export default prayerTimes()
