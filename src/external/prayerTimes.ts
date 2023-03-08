import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'
import { ConvertTimestampToISODate } from '../helpers/date'

class PrayerTimes {
    private options = {
        country: 'IDN',
        iso8601: true,
        tune: '1,1,1,1,0,0',
        method: 11,
    }

    constructor(private config: Config, private logger: winston.Logger) {}

    public CalenderByCity = async (
        year: number,
        month: number,
        city: string
    ) => {
        try {
            const response = await axios.get(
                `${this.config.prayerTimes.url}/calendarByCity/${year}/${month}`,
                {
                    params: {
                        ...this.options,
                        city,
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

    public TimingsByCity = async (date: string, city: string) => {
        try {
            const response = await axios.get(
                `${this.config.prayerTimes.url}/timingsByCity/${date}`,
                {
                    params: {
                        ...this.options,
                        city,
                    },
                }
            )

            const { data } = response.data
            return {
                timings: data.timings,
                date: ConvertTimestampToISODate(data.date.timestamp),
            }
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
}

export default PrayerTimes
