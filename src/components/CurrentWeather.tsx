import s from './CurrentWeather.module.css'
import { OpenWeatherCurrentPart } from '../types/OpenWeatherTypes'
import { AnimatedWeatherIcon, MoonIcon, SunIcon, ThermometerIcon, WeatherIconSize } from './WeatherIcon'
import { formatDate } from '../utils/Date'
import { useTranslation } from 'react-i18next'
import Humidity from './Humidify'
import Wind from './Wind'
import { TFunction } from 'i18next'

const uvIndexToLabel = (t: TFunction<'translation'>, uvi: number) => {
    if (uvi <= 2) return t('low')
    if (uvi <= 5) return t('moderate')
    if (uvi <= 7) return t('high')
    if (uvi <= 10) return t('veryHigh')
    return t('extreme')
}

const uvIndexToClassName = (uvi: number) => {
    if (uvi <= 2) return s.CurrentWeatherUVLow
    if (uvi <= 5) return s.CurrentWeatherUVModerate
    if (uvi <= 7) return s.CurrentWeatherUVHigh
    if (uvi <= 10) return s.CurrentWeatherUVVeryHigh
    return s.CurrentWeatherUVExtreme
}

const UVIndex: React.FC<{ uvi: number }> = ({ uvi }) => {
    const { t } = useTranslation()
    return (
        <div className={s.CurrentWeatherUV}>
            <SunIcon className={s.CurrentWeatherIcon} />
            UV:{' '}
            <span className={`${s.CurrentWeatherUVValue} ${uvIndexToClassName(uvi)}`}>{uvIndexToLabel(t, uvi)}</span>A
        </div>
    )
}

const SunRiseAndSet: React.FC<{ sunrise: number; sunset: number }> = ({ sunrise, sunset }) => {
    const { t } = useTranslation()
    const sunriseDate = formatDate(t, sunrise)
    const sunsetDate = formatDate(t, sunset)
    return (
        <div className={s.CurrentWeatherSunRiseAndSet}>
            <span>
                <SunIcon size={WeatherIconSize.XXS} className={s.CurrentWeatherSunRiseIcon} />
                {sunriseDate.hour}:{sunriseDate.minute}
            </span>
            <span>
                <MoonIcon size={WeatherIconSize.XXS} className={s.CurrentWeatherSunsetIcon} />
                {sunsetDate.hour}:{sunsetDate.minute}
            </span>
        </div>
    )
}

const CurrentWeather: React.FC<{ current: OpenWeatherCurrentPart; full: boolean }> = ({ current, full }) => {
    const { t } = useTranslation()
    return (
        <div className={s.CurrentWeather}>
            <div className={s.CurrentWeatherTempAndFeelsLike}>
                <div className={s.CurrentWeatherRealTemp}>
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
            <div className={s.CurrentWeatherTitle}>
                <h3>{t(current.weather[0].main)}</h3>
                {full && <p>{current.weather[0].description}</p>}
            </div>
            <div className={s.CurrentWeatherAnimatedIcon}>
                <AnimatedWeatherIcon icon={current.weather[0].icon} size={WeatherIconSize.L} />
            </div>
        </div>
    )
}

export default CurrentWeather
