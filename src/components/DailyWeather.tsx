import { OpenWeatherDailyPart } from '../types/OpenWeatherTypes'
import { formatDate } from '../utils/Date'
import { StaticWeatherIcon, ThermometerIcon } from './WeatherIcon'

const DailyWeather: React.FC<{
    daily: OpenWeatherDailyPart[]
    listClassName: string
    itemClassName: string
}> = ({ daily, listClassName, itemClassName }) => (
    <div>
        <h2>Next days</h2>
        <div className={`${listClassName} DailyWeatherList`}>
            {daily.map((daily, idx) => (
                <div
                    className={`${itemClassName} DailyWeatherItem`}
                    key={daily.dt}
                >
                    <span className="DailyWeathertItemDay">
                        {formatDate(daily.dt, idx)}
                    </span>
                    <span className="DailyWeatherTemp DailyWeatherMaxTemp">
                        <ThermometerIcon high />
                        {Math.round(daily.temp.day)}°
                    </span>
                    <span className="DailyWeatherTemp">
                        <ThermometerIcon />
                        {Math.round(daily.temp.night)}°
                    </span>
                    <StaticWeatherIcon icon={daily.weather[0].icon} />
                </div>
            ))}
        </div>
    </div>
)

export default DailyWeather
