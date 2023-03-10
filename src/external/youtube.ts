import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'

class Youtube {
    private options = {
        maxResults: 10,
        type: 'video',
        order: 'date',
        key: this.config.youtube.api_key,
    }

    constructor(private config: Config, private logger: winston.Logger) {}

    async Search() {
        try {
            const response = await axios.get(
                this.config.youtube.api_url + '/search',
                {
                    params: {
                        part: 'snippet',
                        channelId: this.config.youtube.channel_id,
                        ...this.options,
                    },
                }
            )

            return response.data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async Video(ids: string) {
        try {
            const response = await axios.get(
                this.config.youtube.api_url + '/videos',
                {
                    params: {
                        ids,
                        part: 'snippet,statistics,player,contentDetails',
                        channelId: this.config.youtube.channel_id,
                        ...this.options,
                    },
                }
            )

            return response.data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }
}

export default Youtube
