import {
    OpenWeatherDailyPart,
    OpenWeatherDailyTemp,
} from '../types/OpenWeatherTypes'
import { formatDate } from '../utils/Date'
import {
    DropletIcon,
    StaticWeatherIcon,
    ThermometerIcon,
    WeatherIconSize,
} from './WeatherIcon'
import './DailyWeather.css'

const Time: React.FC<{ dt: number; idx: number }> = ({ dt, idx }) => (
    <span className="DailyWeathertItemDay">{formatDate(dt, idx)}</span>
)
const Temp: React.FC<{ temp: OpenWeatherDailyTemp }> = ({ temp }) => (
    <>
        <span className="DailyWeatherTemp DailyWeatherTempDay">
            <ThermometerIcon high />
            {Math.round(temp.day)}°
        </span>
        <span className="DailyWeatherTemp DailyWeatherTempNight">
            <ThermometerIcon />
            {Math.round(temp.night)}°
        </span>
    </>
)

const Rain: React.FC<{ rain?: number }> = ({ rain }) => {
    const mm = Math.round(rain ?? 0)
    if (mm > 0) {
        return (
            <span>
                <DropletIcon
                    className="DailyWeatherRainIcon"
                    size={WeatherIconSize.XS}
                />
                {mm}mm
            </span>
        )
    }
    return <></>
}

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
                    <Time dt={daily.dt} idx={idx} />
                    <Temp temp={daily.temp} />
                    <StaticWeatherIcon icon={daily.weather[0].icon} />
                    <Rain rain={daily.rain} />
                </div>
            ))}
        </div>
    </div>
)

export default DailyWeather
