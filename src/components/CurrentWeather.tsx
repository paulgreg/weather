import { OpenWeatherCurrentPart } from '../types/OpenWeatherTypes'
import {
    AnimatedWeatherIcon,
    ThermometerIcon,
    WeatherIconSize,
} from './WeatherIcon'
import './CurrentWeather.css'

const CurrentWeather: React.FC<{ current: OpenWeatherCurrentPart }> = ({
    current,
}) => (
    <div className="CurrentWeather">
        <div className="CurrentWeatherDesc">
            <div>
                <div className="CurrentWeatherDescTemp">
                    <ThermometerIcon size={WeatherIconSize.S} />
                    {Math.round(current.temp)}°
                </div>
                <span>feels like {Math.round(current.feels_like)}°</span>
            </div>
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
