import request from './request'
import { OpenWeatherResponse } from '../types/OpenWeatherTypes'
import { requestMock } from './OpenWeatherMock'
import { getTimeRoundedToMinute } from './Date'
import { useTranslation } from 'react-i18next'
import useConfig from './useConfig'

const weatherCache: Record<
    CityOrPosition['label'],
    {
        refreshKey: number
        weatherOsmUrl: string
        weatherData: OpenWeatherResponse
    }
> = {}

const getCurrentPosition = () =>
    new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10_000,
        })
    )

const getCityOrMyPositionLatLng = async (city: CityOrPosition) => {
    if ('myposition' in city) {
        const position = await getCurrentPosition()
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        return { lat, lng }
    }
    const { lat, lng } = city
    return Promise.resolve({ lat, lng })
}

const fetchWeather = async (city: CityOrPosition, refreshKey: number, apiKey: string, language: string) => {
    if (!weatherCache[city.label] || weatherCache[city.label].refreshKey < refreshKey) {
        const { lat, lng } = await getCityOrMyPositionLatLng(city)
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=${language}`

        const weatherData = import.meta.env.PROD
            ? await request<OpenWeatherResponse>(weatherUrl)
            : await requestMock(weatherUrl)

        const weatherOsmUrl = `https://www.openstreetmap.org/?mlat=${weatherData.lat}&mlon=${weatherData.lon}&zoom=12`
        weatherCache[city.label] = {
            refreshKey,
            weatherOsmUrl,
            weatherData,
        }
    }
    return weatherCache[city.label]
}

export default fetchWeather
