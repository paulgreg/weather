type options = {
    public?: boolean
}
const request = async <T>(url: string): Promise<T> => {
    const prefix = url.startsWith('http') || url.startsWith('//') ? '' : import.meta.env.BASE_URL
    const fullUrl = `${prefix}${url}`
    console.log('request', fullUrl)
    const response = await fetch(fullUrl)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default request
