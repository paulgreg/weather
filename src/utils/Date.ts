import { useTranslation } from 'react-i18next'

export const MINUTE = 60_000
export const HOUR = 60 * MINUTE

export const padTime = (n: number) => `${n < 10 ? '0' : ''}${n}`

export const formatTime = (dt: number) => {
    const d = new Date(dt * 1000)
    return `${padTime(d.getHours())}:${padTime(d.getMinutes())}`
}

export const getHour = (dt: number) => {
    const d = new Date(dt * 1000)
    return d.getHours()
}

const getDayName = (day: number, idx?: number) => {
    const { t } = useTranslation()
    if (idx === 0) return t('today')
    if (idx === 1) return t('tomorrow')
    switch (day) {
        case 0:
            return t('sunday')
        case 1:
            return t('monday')
        case 2:
            return t('tuesday')
        case 3:
            return t('wednesday')
        case 4:
            return t('thursday')
        case 5:
            return t('friday')
        default:
            return t('saturday')
    }
}

const pad = (n: number) => n.toString().padStart(2, '0')

export const formatDate = (dt: number, idx?: number) => {
    const d = new Date(dt * 1000)
    return {
        day: getDayName(d.getDay(), idx),
        date: pad(d.getDate()),
        month: pad(d.getMonth()),
        year: d.getFullYear().toString().substring(2),
        hour: pad(d.getHours()),
        minute: pad(d.getMinutes()),
    }
}

export const wait = (time: number) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(resolve), time)
    })

const roundToHour = (time: number) => Math.floor(time / 1000 / 60 / 60)

export const getTimeRoundedToHour = () => roundToHour(Date.now())
