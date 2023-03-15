import { DateTime } from 'luxon'
import config from '../config/config'
import Mongo from '../database/mongo/mongo'
import activitySchema from '../database/mongo/schema/activity.schema'
import bannerSchema from '../database/mongo/schema/banner.schema'
import CoreData from '../external/coreData'
import { GetRangeDaysOfMonth } from '../helpers/date'
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
    const { firstDayOfMonth, lastDayOfMonth } = GetRangeDaysOfMonth()

    const activities = await coreData.Activity(firstDayOfMonth, lastDayOfMonth)

    const payloads: Record<string, Object[]> = {}
    for (let index = 0; index < activities.length; index++) {
        const activity = activities[index]
        if (payloads[activity.tanggal_kegiatan] !== activity.tanggal_kegiatan) {
            payloads[activity.tanggal_kegiatan] = new Array()
        }

        payloads[activity.tanggal_kegiatan].push(activity)
    }

    for (const payload in payloads) {
        if (Object.prototype.hasOwnProperty.call(payloads, payload)) {
            const activity = payloads[payload]

            await activitySchema.updateOne(
                {
                    date: payload,
                },
                {
                    date: payload,
                    payloads: activity,
                },
                {
                    upsert: true,
                }
            )
        }
    }
}

const coreData = async () => {
    const { logger } = new Logger(config)
    await Mongo.connect(logger, config)

    const coreData = new CoreData(config, logger)

    await bannerStore(coreData)
    await activityStore(coreData)

    process.exit()
}

export default coreData()
