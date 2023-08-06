import './DailyWeather.css'
import { OpenWeatherDailyPart, OpenWeatherDailyTemp } from '../types/OpenWeatherTypes'
import { DropletIcon, StaticWeatherIcon, ThermometerIcon, WeatherIconSize } from './WeatherIcon'
import { formatDate } from '../utils/Date'
import { useTranslation } from 'react-i18next'

const Day: React.FC<{ dt: number; idx: number }> = ({ dt, idx }) => {
    const { day, date, month } = formatDate(dt, idx)
    return (
        <div className="DailyWeathertItemDay">
            <div>{day}</div>
            <div>
                {date}/{month}
            </div>
        </div>
    )
}
const Temp: React.FC<{ temp: OpenWeatherDailyTemp }> = ({ temp }) => (
    <>
        <span className="DailyWeatherTemp DailyWeatherTempNight">
            <ThermometerIcon />
            {Math.round(temp.night)}°
        </span>
        <span className="DailyWeatherTemp DailyWeatherTempDay">
            <ThermometerIcon high />
            {Math.round(temp.day)}°
        </span>
    </>
)

const Rain: React.FC<{ rain?: number }> = ({ rain }) => {
    const mm = Math.round(rain ?? 0)
    if (mm > 0) {
        return (
            <span>
                <DropletIcon className="DailyWeatherRainIcon" size={WeatherIconSize.XS} />
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
}> = ({ daily, listClassName, itemClassName }) => {
    const { t } = useTranslation()
    return (
        <div>
            <h2>{t('dayByDay')}</h2>
            <div className={`${listClassName} DailyWeatherList`}>
                {daily.map((daily, idx) => (
                    <div className={`${itemClassName} DailyWeatherItem`} key={daily.dt}>
                        <Day dt={daily.dt} idx={idx} />
                        <Temp temp={daily.temp} />
                        <StaticWeatherIcon icon={daily.weather[0].icon} />
                        <Rain rain={daily.rain} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DailyWeather
