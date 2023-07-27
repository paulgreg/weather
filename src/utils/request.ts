type options = {
    public?: boolean
}
const request = async <T>(url: string): Promise<T> => {
    const prefix = url.startsWith('http') ? '' : import.meta.env.PROD ? '/weather' : ''
    const response = await fetch(`${prefix}${url}`)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default request
