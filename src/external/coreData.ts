import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'
import { ConvertISOToDate } from '../helpers/date'

class CoreData {
    constructor(private config: Config, private logger: winston.Logger) {}

    async Banner() {
        try {
            const response = await axios.get(
                this.config.coreData.url + `/banner`
            )
            const { data } = response
            return data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async Activity(start_date: string, end_date: string) {
        try {
            const response = await axios.get(
                this.config.coreData.url + `/kegiatan`,
                {
                    params: {
                        start_date: ConvertISOToDate(start_date),
                        end_date: ConvertISOToDate(end_date),
                    },
                }
            )
            const { data } = response
            return data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async ActivityById(id: string) {
        try {
            const response = await axios.get(
                this.config.coreData.url + `/kegiatan/${id}`
            )

            const { data } = response
            return data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
}

export default CoreData
