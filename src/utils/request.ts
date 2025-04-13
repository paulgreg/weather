type options = {
    public?: boolean
}
const request = async <T>(url: string): Promise<T> => {
    const prefix = url.startsWith('http') || url.startsWith('//') ? '' : import.meta.env.BASE_URL
    const fullUrl = `${prefix}${url}`
    console.log('request', fullUrl)
    const response = await fetch(fullUrl)

    if (response.redirected && response.url.includes('/vouch/login')) {
        const shouldRefresh = confirm('Your session has expired. Would you like to refresh the page ?')
        if (shouldRefresh) window.location.reload()
    }

    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}

export default request
