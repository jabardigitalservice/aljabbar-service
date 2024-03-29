import winston from 'winston'
import { Config } from '../../config/config.interface'
import Http from '../../transport/http/http'
import Handler from './delivery/http/handler'
import Repository from './repository/mongo/repository'
import Usecase from './usecase/usecase'

class Media {
    constructor(
        private http: Http,
        private logger: winston.Logger,
        private config: Config
    ) {
        const repository = new Repository(logger)
        const usecase = new Usecase(repository, logger)

        this.loadHttp(usecase)
    }

    private loadHttp(usecase: Usecase) {
        const handler = new Handler(usecase, this.logger)
        const Router = this.http.Router()

        Router.get('/v1/media/', handler.FindAll())

        this.http.SetRouter('/api', Router)
    }
}

export default Media
