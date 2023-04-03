export const LOCALSTORAGE_KEY = 'WEATHER_CITIES'

export const LOCALSTORAGE_APIKEY_KEY = 'WEATHER_CITIES_API_KEY'

export const getCitiesFromLocalStore: City[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || '[]'
).sort((cityA: City, cityB: City) => {
    if (cityA.code === cityB.code) return cityA.city.localeCompare(cityB.city)
    return cityA.country.localeCompare(cityB.country)
})

export const saveCitiesInLocalStore = (newCities: City[]) =>
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newCities))

export const saveApiKeyInLocalStore = (apiKey: string) =>
    localStorage.setItem(LOCALSTORAGE_APIKEY_KEY, apiKey)

export const getApiKeyFromLocalStore = () =>
    localStorage.getItem(LOCALSTORAGE_APIKEY_KEY)
