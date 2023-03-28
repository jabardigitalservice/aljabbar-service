import config from '../config/config'
import Mongo from '../database/mongo/mongo'
import activitySchema from '../database/mongo/schema/activity.schema'
import bannerSchema from '../database/mongo/schema/banner.schema'
import CoreData from '../external/coreData'
import { GetRangeDaysOfYear } from '../helpers/date'
import Logger from '../pkg/logger'

const bannerStore = async (coreData: CoreData) => {
    const banners = await coreData.Banner()

    for (const banner of banners) {
        await bannerSchema.updateOne(
            {
                urutan: banner.urutan,
            },
            banner,
            {
                upsert: true,
            }
        )
    }
}

const activityStore = async (coreData: CoreData) => {
    const { firstDayOfMonth, lastDayOfYear } = GetRangeDaysOfYear()

    const activities = await coreData.Activity(firstDayOfMonth, lastDayOfYear)

    const payloads: Record<string, Object[]> = {}
    const dates = []
    for (let index = 0; index < activities.length; index++) {
        const activity = activities[index]
        const activityDate = activity.tanggal_kegiatan
        if (!payloads[activityDate]) {
            payloads[activityDate] = new Array()
            dates.push(activityDate)
        }

        payloads[activityDate].push(activity)
    }

    for (const payload in payloads) {
        if (Object.prototype.hasOwnProperty.call(payloads, payload)) {
            const activity = payloads[payload]

            await activitySchema.updateOne(
                {
                    date: new Date(payload),
                },
                {
                    date: new Date(payload),
                    payloads: activity,
                },
                {
                    upsert: true,
                }
            )
        }
    }

    // delete data at out not exist dates and greater dates for the first day of the month
    await activitySchema.deleteMany({
        date: {
            $nin: dates,
            $gte: firstDayOfMonth,
        },
    })
}

const coreData = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)

    const coreData = new CoreData(config, logger)

    try {
        await bannerStore(coreData)
        await activityStore(coreData)
    } catch (error) {
        logger.error(error)
    }

    process.exit()
}

export default coreData()
