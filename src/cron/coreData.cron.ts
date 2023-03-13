import { DateTime } from 'luxon'
import config from '../config/config'
import Mongo from '../database/mongo/mongo'
import activitySchema from '../database/mongo/schema/activity.schema'
import bannerSchema from '../database/mongo/schema/banner.schema'
import CoreData from '../external/coreData'
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
    const today = DateTime.now().toISO()
    const firstDayOfMonth = DateTime.fromISO(today).startOf('month').toISO()
    const lastDayOfMonth = DateTime.fromISO(today).endOf('month').toISO()

    const activities = await coreData.Activity(firstDayOfMonth, lastDayOfMonth)

    for (const activity of activities) {
        await activitySchema.updateOne(
            {
                id: activity.id,
            },
            activity,
            {
                upsert: true,
            }
        )
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
