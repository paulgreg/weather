import './CurrentWeather.css'
import { OpenWeatherCurrentPart } from '../types/OpenWeatherTypes'
import { AnimatedWeatherIcon, MoonIcon, SunIcon, ThermometerIcon, WeatherIconSize } from './WeatherIcon'
import { formatDate } from '../utils/Date'
import { useTranslation } from 'react-i18next'
import Humidity from './Humidify'
import Wind from './Wind'

const uvIndexToLabel = (uvi: number) => {
    const { t } = useTranslation()
    if (uvi <= 2) return t('low')
    if (uvi <= 5) return t('moderate')
    if (uvi <= 7) return t('high')
    if (uvi <= 10) return t('veryHigh')
    return t('extreme')
}

const uvIndexToClassName = (uvi: number) => {
    const prefix = 'CurrentWeatherUV-'
    if (uvi <= 2) return `${prefix}low`
    if (uvi <= 5) return `${prefix}moderate`
    if (uvi <= 7) return `${prefix}high`
    if (uvi <= 10) return `${prefix}very-high`
    return `${prefix}extreme`
}

const UVIndex: React.FC<{ uvi: number }> = ({ uvi }) => (
    <div className="CurrentWeatherUV">
        <SunIcon className="CurrentWeatherIcon" />
        UV: <span className={`CurrentWeatherUVValue ${uvIndexToClassName(uvi)}`}>{uvIndexToLabel(uvi)}</span>
    </div>
)

const SunRiseAndSet: React.FC<{ sunrise: number; sunset: number }> = ({ sunrise, sunset }) => {
    const sunriseDate = formatDate(sunrise)
    const sunsetDate = formatDate(sunset)
    return (
        <div className="CurrentWeatherSunRiseAndSet">
            <SunIcon size={WeatherIconSize.XXS} className="CurrentWeatherSunRiseIcon" />
            {sunriseDate.hour}:{sunriseDate.minute}
            <MoonIcon size={WeatherIconSize.XXS} className="CurrentWeatherSunsetIcon" />
            {sunsetDate.hour}:{sunsetDate.minute}
        </div>
    )
}

const CurrentWeather: React.FC<{ current: OpenWeatherCurrentPart; full: boolean }> = ({ current, full }) => {
    const { t } = useTranslation()
    return (
        <div className="CurrentWeather">
            <div className="CurrentWeatherTempAndFeelsLike">
                <div className="CurrentWeatherRealTemp">
                    <ThermometerIcon size={WeatherIconSize.S} />
                    {Math.round(current.temp)}°
                </div>
                <span>
                    {t('feelsLike')} {Math.round(current.feels_like)}°
                </span>
            </div>
            <div>
                {full && <UVIndex uvi={current.uvi} />}
                <Humidity humidity={current.humidity} />
                <Wind wind_speed={current.wind_speed} wind_deg={current.wind_deg} expanded directionIcon />
                <SunRiseAndSet sunrise={current.sunrise} sunset={current.sunset} />
            </div>
            <div className="CurrentWeatherTitle">
                <h3>{t(current.weather[0].main)}</h3>
                {full && <p>{current.weather[0].description}</p>}
            </div>
            <div className="CurrentWeatherAnimatedIcon ">
                <AnimatedWeatherIcon icon={current.weather[0].icon} size={WeatherIconSize.L} />
            </div>
        </div>
    )
}

export default CurrentWeather
