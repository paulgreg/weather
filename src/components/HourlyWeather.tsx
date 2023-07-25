import {
    OpenWeatherHourlyPart,
    OpenWeatherRain,
} from '../types/OpenWeatherTypes'
import { formatTime, getHour } from '../utils/Date'
import { DropletIcon, StaticWeatherIcon, WeatherIconSize } from './WeatherIcon'
import { useTranslation } from 'react-i18next'
import './HourlyWeather.css'

const Time: React.FC<{ dt: number }> = ({ dt }) => <span>{formatTime(dt)}</span>

const FeelsLike: React.FC<{
    feels_like: number
    dt: number
    sunrise: number
    sunset: number
}> = ({ feels_like, dt, sunrise, sunset }) => {
    const sunsetTime = getHour(sunset)
    const sunriseHour = getHour(sunrise)
    const currentTime = getHour(dt)
    const isDay = currentTime > sunriseHour && currentTime < sunsetTime
    return (
        <span
            className={
                isDay ? 'HourlyWeatherTempDay' : 'HourlyWeatherTempNight'
            }
        >
            {Math.round(feels_like)}°
        </span>
    )
}

const Rain: React.FC<{ rain?: OpenWeatherRain }> = ({ rain }) => {
    const mm = (rain && Math.round(rain?.['1h'])) ?? 0
    if (mm > 0) {
        return (
            <span className="HourlyWeatherRain">
                <DropletIcon
                    className="HourlyWeatherRainIcon"
                    size={WeatherIconSize.XXXS}
                />
                {mm}mm
            </span>
        )
    }
    return <></>
}

const HourlyWeather: React.FC<{
    hourly: OpenWeatherHourlyPart[]
    sunrise: number
    sunset: number
    listClassName: string
    itemClassName: string
}> = ({ hourly, sunrise, sunset, listClassName, itemClassName }) => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('hourByHour')}</h2>
            <div className={listClassName}>
                {hourly.map((hourly) => (
                    <div
                        className={`${itemClassName} HourlyWeatherItem`}
                        key={hourly.dt}
                    >
                        <Time dt={hourly.dt} />
                        <FeelsLike
                            feels_like={hourly.feels_like}
                            dt={hourly.dt}
                            sunrise={sunrise}
                            sunset={sunset}
                        />
                        <StaticWeatherIcon icon={hourly.weather[0].icon} />
                        <Rain rain={hourly.rain} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HourlyWeather
