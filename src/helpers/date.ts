import { DateTime } from 'luxon'

export const ConvertTimestampToISODate = (date: string) => {
    return DateTime.fromSeconds(parseInt(date)).toISODate()
}

export const ConvertISOToDate = (date: string) => {
    return DateTime.fromISO(date).toISODate()
}

export const GetRangeDaysOfMonth = () => {
    const today = DateTime.now().toISO()
    const firstDayOfMonth = DateTime.fromISO(today).startOf('month').toISO()
    const lastDayOfMonth = DateTime.fromISO(today).endOf('month').toISO()
    return { firstDayOfMonth, lastDayOfMonth }
}

export const GetRangeDaysOfYear = () => {
    const today = DateTime.now().toISO()
    const firstDayOfMonth = DateTime.fromISO(today).startOf('month').toISO()
    const lastDayOfYear = DateTime.fromISO(today).endOf('year').toISO()

    return { firstDayOfMonth, lastDayOfYear }
}
