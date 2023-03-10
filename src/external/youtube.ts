import axios from 'axios'
import winston from 'winston'
import { Config } from '../config/config.interface'

class Youtube {
    constructor(private config: Config, private logger: winston.Logger) {}

    async Search(pageToken?: string) {
        try {
            const response = await axios.get(
                this.config.youtube.api_url + '/search',
                {
                    params: {
                        key: this.config.youtube.api_key,
                        part: 'snippet',
                        channelId: this.config.youtube.channel_id,
                        maxResults: 50,
                        pageToken,
                        type: 'video',
                    },
                }
            )

            return response.data
        } catch (error) {
            this.logger.error(error)
            throw error
        }
    }

    async Video(id: string) {
        try {
            const response = await axios.get(
                this.config.youtube.api_url + '/videos',
                {
                    params: {
                        id,
                        key: this.config.youtube.api_key,
                        part: 'snippet,statistics,player,contentDetails',
                        channelId: this.config.youtube.channel_id,
                        maxResults: 1,
                        type: 'video',
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
