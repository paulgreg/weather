import { OpenWeatherHourlyPart } from '../types/OpenWeatherTypes'
import { formatTime } from '../utils/Date'
import { StaticWeatherIcon } from './WeatherIcon'
import './HourlyWeather.css'

const HourlyWeather: React.FC<{
    hourly: OpenWeatherHourlyPart[]
    listClassName: string
    itemClassName: string
}> = ({ hourly, listClassName, itemClassName }) => (
    <div>
        <h2>Next 24 hours</h2>
        <div className={listClassName}>
            {hourly.map((hourly) => (
                <div
                    className={`${itemClassName} HourlyWeatherItem`}
                    key={hourly.dt}
                >
                    <span>{formatTime(hourly.dt)}</span>
                    <span>{Math.round(hourly.feels_like)}°</span>
                    <StaticWeatherIcon icon={hourly.weather[0].icon} />
                </div>
            ))}
        </div>
    </div>
)

export default HourlyWeather
