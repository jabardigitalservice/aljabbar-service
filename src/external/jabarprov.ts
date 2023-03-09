import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'
import { Meta, Paginate } from '../helpers/paginate'

class Jabarprov {
    constructor(private config: Config, private logger: winston.Logger) {}

    public async Search(page: number, limit: number) {
        try {
            const response = await axios.get(
                `${this.config.jabarprov.url}/v1/search`,
                {
                    params: {
                        q: this.config.jabarprov.keyword,
                        page,
                        per_page: limit,
                        sort_order: 'DESC',
                        'domain[]': 'news',
                    },
                }
            )

            const { data, meta } = response.data
            const paginate = Paginate({ page, limit })
            return {
                data,
                meta: Meta(paginate, meta.total_count),
            }
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
}

export default Jabarprov
