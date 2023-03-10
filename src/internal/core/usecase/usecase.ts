import winston from 'winston'
import CoreData from '../../../external/coreData'
import { Activity } from '../entity/interface'

class Usecase {
    constructor(private coreData: CoreData, private logger: winston.Logger) {}

    public async Banner() {
        const res = await this.coreData.Banner()

        return res
    }

    public async Activity({ start_date, end_date }: Activity) {
        const res = await this.coreData.Activity(start_date, end_date)

        return res
    }

    public async ActivityByID(id: string) {
        const res = await this.coreData.ActivityById(id)

        return res
    }
}

export default Usecase
