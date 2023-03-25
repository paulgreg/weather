const request = async <T>(url: string): Promise<T> => {
    const prefix = process.env.NODE_ENV === 'production' ? '.' : '/public'
    const response = await fetch(`${prefix}${url}`)
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default request
