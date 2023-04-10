export const LOCALSTORAGE_KEY = 'WEATHER_CITIES'

export const LOCALSTORAGE_APIKEY_KEY = 'WEATHER_CITIES_API_KEY'

export const getCitiesFromLocalStore: (City | MyPosition)[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || '[]'
)

export const saveCitiesInLocalStore = (newCities: (City | MyPosition)[]) =>
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newCities))

export const saveApiKeyInLocalStore = (apiKey: string) =>
    localStorage.setItem(LOCALSTORAGE_APIKEY_KEY, apiKey)

export const getApiKeyFromLocalStore = () =>
    localStorage.getItem(LOCALSTORAGE_APIKEY_KEY)
