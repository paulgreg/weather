const request = async <T>(url: string, errorMsg?: string): Promise<T> => {
    try {
        const prefix = url.startsWith('http') || url.startsWith('//') ? '' : import.meta.env.BASE_URL
        const fullUrl = `${prefix}${url}`
        console.log('request', fullUrl)
        const response = await fetch(fullUrl)
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    } catch (error) {
        const e = error as Error
        console.error(e)
        if (errorMsg) {
            alert(errorMsg)
            location.reload()
        }
        throw e
    }
}

export default request
