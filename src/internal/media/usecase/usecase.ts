import winston from 'winston'
import Repository from '../repository/mongo/repository'

class Usecase {
    constructor(
        private repository: Repository,
        private logger: winston.Logger
    ) {}

    public async FindAll() {
        const item = await this.repository.FindAll()

        return item
    }
}

export default Usecase
