export const padTime = (n: number) => `${n < 10 ? '0' : ''}${n}`

export const formatTime = (dt: number) => {
    const d = new Date(dt * 1000)
    return `${padTime(d.getHours())}:${padTime(d.getMinutes())}`
}

const pad = (n: number) => n.toString().padStart(2, '0')

export const formatDate = (dt: number, idx: number) => {
    if (idx === 0) return 'today'
    if (idx === 1) return 'tomorrow'
    const d = new Date(dt * 1000)
    return `${pad(d.getDate())}/${pad(d.getMonth())}`
}
