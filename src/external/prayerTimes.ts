import axios from 'axios'
import { DateTime } from 'luxon'
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
    public FormatTimes = (times: any, replace: string) => {
        for (const key in times) {
            if (Object.prototype.hasOwnProperty.call(times, key)) {
                const time = times[key].replace(replace, '').replace('T', ' ')
                times[key] = DateTime.fromFormat(time, 'yyyy-MM-dd HH:mm:ss')
                    .toUTC()
                    .plus({ hours: 7 })
                    .toBSON()
            }
        }

        return {
            imsak: times.Imsak,
            fajr: times.Fajr,
            sunrise: times.Sunrise,
            dhuhr: times.Dhuhr,
            asr: times.Asr,
            maghrib: times.Maghrib,
            isha: times.Isha,
        }
    }
}

export default PrayerTimes
