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
    const nextMonth = today.plus({ months: 1 })
    const calendars = await prayerTimes.Calender(today.year, today.month)
    const calendarNextMonth = await prayerTimes.Calender(
        nextMonth.year,
        nextMonth.month
    )

    calendars.push(...calendarNextMonth)

    for (const calendar of calendars) {
        const date = ConvertTimestampToISODate(calendar.date.timestamp)
        const times = prayerTimes.FormatTimes(calendar.timings, '+07:00 (WIB)')

        await prayerTimesSchema.updateOne(
            {
                date,
            },
            {
                times,
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
