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
    if (idx === 0) return 'today'
    if (idx === 1) return 'tomorrow'
    switch (day) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        default:
            return 'Saturday'
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

const roundToMinute = (time: number) => Math.round(time / 1000 / 60)

export const getTimeRoundedToMinute = () => roundToMinute(Date.now())
