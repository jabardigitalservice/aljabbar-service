import winston from 'winston'
import { Config } from '../../config/config.interface'
import Jabarprov from '../../external/jabarprov'
import Http from '../../transport/http/http'
import Handler from './delivery/http/handler'
import Usecase from './usecase/usecase'

class News {
    constructor(
        private http: Http,
        private logger: winston.Logger,
        private config: Config
    ) {
        const repository = new Jabarprov(config, logger)
        const usecase = new Usecase(repository, logger)

        this.loadHttp(usecase)
    }

    private loadHttp(usecase: Usecase) {
        const handler = new Handler(usecase, this.logger)
        const Router = this.http.Router()

        Router.get('/v1/news', handler.FindAll())

        this.http.SetRoute('/api', Router)
    }
}

export default News
