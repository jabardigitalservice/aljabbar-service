import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'

class PrayerTimes {
    private options = {
        iso8601: true,
        method: 11,
    }

    constructor(private config: Config, private logger: winston.Logger) {}

    public Calender = async (year: number, month: number) => {
        try {
            const response = await axios.get(
                `${this.config.prayerTimes.url}/calendar/${year}/${month}`,
                {
                    params: {
                        ...this.options,
                        longitude: this.config.prayerTimes.longitude,
                        latitude: this.config.prayerTimes.latitude,
                    },
                }
            )
            const { data } = response.data
            return data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
    public FormatTimings = (timings: any, replace: string) => {
        for (const key in timings) {
            if (Object.prototype.hasOwnProperty.call(timings, key)) {
                const time = timings[key].replace(` ${replace}`, '')
                timings[key] = time
            }
        }

        return timings
    }
}

export default PrayerTimes
