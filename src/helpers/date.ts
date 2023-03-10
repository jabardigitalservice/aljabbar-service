import { DateTime } from 'luxon'

export const ConvertTimestampToISODate = (date: string) => {
    return DateTime.fromSeconds(parseInt(date)).toISODate()
}

export const ConvertISOToDate = (date: string) => {
    return DateTime.fromISO(date).toISODate()
}
