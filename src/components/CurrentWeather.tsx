import { OpenWeatherCurrentPart } from '../types/OpenWeatherTypes'
import {
    AnimatedWeatherIcon,
    DropletIcon,
    SunIcon,
    ThermometerIcon,
    WeatherIconSize,
    WindIcon,
} from './WeatherIcon'
import './CurrentWeather.css'

const uvIndexToLabel = (uvi: number) => {
    if (uvi <= 2) return 'low'
    if (uvi <= 5) return 'moderate'
    if (uvi <= 7) return 'high'
    if (uvi <= 10) return 'very high'
    return 'extreme'
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
        UV index:{' '}
        <span className={uvIndexToClassName(uvi)}>{uvIndexToLabel(uvi)}</span>
    </div>
)

const Wind: React.FC<{ wind_speed: number }> = ({ wind_speed }) => (
    <div className="CurrentWeatherWind">
        <WindIcon className="CurrentWeatherIcon" />
        wind: {Math.round(wind_speed / 1000)} km/h
    </div>
)

const Humidity: React.FC<{ humidity: number }> = ({ humidity }) => (
    <div className="CurrentWeatherHumidity">
        <DropletIcon className="CurrentWeatherIcon" />
        humidity: {humidity} %
    </div>
)

const CurrentWeather: React.FC<{ current: OpenWeatherCurrentPart }> = ({
    current,
}) => (
    <div className="CurrentWeather">
        <div className="CurrentWeatherDesc">
            <div className="CurrentWeatherTempAndFeelsLike">
                <div className="CurrentWeatherRealTemp">
                    <ThermometerIcon size={WeatherIconSize.S} />
                    {Math.round(current.temp)}°
                </div>
                <span>feels like {Math.round(current.feels_like)}°</span>
            </div>
            <Humidity humidity={current.humidity} />
            <UVIndex uvi={current.uvi} />
            <Wind wind_speed={current.wind_speed} />
            <h3>{current.weather[0].main}</h3>
            <p>{current.weather[0].description}</p>
        </div>
        <AnimatedWeatherIcon
            icon={current.weather[0].icon}
            size={WeatherIconSize.L}
        />
    </div>
)

export default CurrentWeather
