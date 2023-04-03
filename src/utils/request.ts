type options = {
    public?: boolean
}
const request = async <T>(url: string, options?: options): Promise<T> => {
    const prefix = options?.public ? '.' : ''
    const response = await fetch(`${prefix}${url}`)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default request
