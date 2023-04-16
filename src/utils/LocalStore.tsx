export const LOCALSTORAGE_KEY = 'WEATHER_CITIES'

export const LOCALSTORAGE_API_KEY = 'WEATHER_CITIES_API_KEY'

export const LOCALSTORAGE_REFRESH_KEY = 'WEATHER_CITIES_REFRESH_KEY'

export const getCitiesFromLocalStore: CityOrPosition[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || '[]'
)

export const saveCitiesInLocalStore = (newCities: CityOrPosition[]) =>
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newCities))

export const saveApiKeyInLocalStore = (apiKey: string) =>
    localStorage.setItem(LOCALSTORAGE_API_KEY, apiKey)

export const getApiKeyFromLocalStore = () =>
    localStorage.getItem(LOCALSTORAGE_API_KEY)

export const saveRefreshKeyInLocalStore = (refreshKey: number) =>
    localStorage.setItem(LOCALSTORAGE_REFRESH_KEY, refreshKey.toString())

export const getRefreshKeyFromLocalStore = () =>
    localStorage.getItem(LOCALSTORAGE_REFRESH_KEY)
