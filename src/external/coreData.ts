import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'

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

    async Activity(startDate: string, endDate: string) {
        try {
            const response = await axios.get(
                this.config.coreData.url + `/kegiatan`,
                {
                    params: {
                        start_date: startDate,
                        end_date: endDate,
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
