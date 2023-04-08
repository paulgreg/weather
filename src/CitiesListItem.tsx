import { useEffect, useState } from 'react'
import { formatDate, formatTime } from './utils/Date'
import './CitiesListItem.css'
import {
    AnimatedWeatherIcon,
    StaticWeatherIcon,
    ThermometerIcon,
    WeatherIconSize,
} from './components/WeatherIcon'
import { alert, OpenWeatherResponse } from './types/OpenWeatherTypes'
import request from './utils/request'

type CitiesListItemType = {
    city: City
    apiKey?: string
    refreshKey: number
    onDeleteCity: () => void
}

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => (
    <small className="RefreshedAt">
        refreshed at {new Date(dt * 1000).toLocaleTimeString()}
    </small>
)

const CitiesListItem: React.FC<CitiesListItemType> = ({
    city,
    onDeleteCity,
    apiKey,
    refreshKey,
}) => {
    const [weather, setWeather] = useState<OpenWeatherResponse>()
    const [alerts, setAlerts] = useState<alert[]>([])

    useEffect(() => {
        if (apiKey) {
            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lng}&exclude=minutely&appid=${apiKey}&units=metric&lang=en`
            console.log('request url', url)

            request<OpenWeatherResponse>(url).then((data) => {
                setWeather(data)
                setAlerts(
                    (data?.alerts ?? []).filter(
                        (alert) =>
                            data.current.dt > alert.start &&
                            data.current.dt < alert.end
                    )
                )
            })
        }
    }, [city, apiKey, refreshKey, setWeather, setAlerts])

    return (
        <div className="CitiesListItem">
            <div className="CitiesListItemHeader">
                <h1>
                    {city.city}{' '}
                    <small title={city.country} tabIndex={0}>
                        ({city.code})
                    </small>
                </h1>
                <div className="CitiesListItemHeaderDetails">
                    <span>
                        <button className="delete" onClick={onDeleteCity}>
                            ❌ delete
                        </button>
                    </span>
                    {weather && <RefreshedAt dt={weather.current.dt} />}
                </div>
            </div>
            {weather && (
                <>
                    <div>
                        <div className="CitiesListItemCurrent">
                            <div className="CitiesListItemCurrentDesc">
                                <div>
                                    <div className="CitiesListItemCurrentDescTemp">
                                        <ThermometerIcon
                                            size={WeatherIconSize.S}
                                        />
                                        {Math.round(weather.current.temp)}°
                                    </div>
                                    <span>
                                        feels like{' '}
                                        {Math.round(weather.current.feels_like)}
                                        °
                                    </span>
                                </div>
                                <h3>{weather.current.weather[0].main}</h3>
                                <p>{weather.current.weather[0].description}</p>
                            </div>
                            <AnimatedWeatherIcon
                                icon={weather.current.weather[0].icon}
                                size={WeatherIconSize.L}
                            />
                        </div>
                        <h2>Next hours</h2>
                        <div className="CitiesListItemList">
                            {weather.hourly.map((hourly) => (
                                <div
                                    className="CitiesListItemListItem CitiesListItemHourListItem"
                                    key={hourly.dt}
                                >
                                    <span>{formatTime(hourly.dt)}</span>
                                    <span>
                                        {Math.round(hourly.feels_like)}°
                                    </span>
                                    <StaticWeatherIcon
                                        icon={hourly.weather[0].icon}
                                    />
                                </div>
                            ))}
                        </div>
                        <h2>Next days</h2>
                        <div className="CitiesListItemList CitiesListDayItemList">
                            {weather.daily.map((daily, idx) => (
                                <div
                                    className="CitiesListItemListItem CitiesListItemDayListItem"
                                    key={daily.dt}
                                >
                                    <span className="CitiesListItemListItemDay">
                                        {formatDate(daily.dt, idx)}
                                    </span>
                                    <span className="CitiesListItemDayTemp CitiesListItemDayMaxTemp">
                                        <ThermometerIcon high />
                                        {Math.round(daily.temp.day)}°
                                    </span>
                                    <span className="CitiesListItemDayTemp">
                                        <ThermometerIcon />
                                        {Math.round(daily.temp.night)}°
                                    </span>
                                    <StaticWeatherIcon
                                        icon={daily.weather[0].icon}
                                    />
                                </div>
                            ))}
                        </div>
                        {alerts?.length > 0 && (
                            <details className="CitiesListItemAlert">
                                <summary>Alerts</summary>
                                {alerts.map((alert) => (
                                    <div
                                        className="CitiesListItemAlertListItem"
                                        key={alert.event}
                                    >
                                        <div className="CitiesListItemAlertListItemHeader">
                                            <h3>{alert.event}</h3>
                                            <small>{alert.sender_name}</small>
                                        </div>
                                        <div>{alert.description}</div>
                                    </div>
                                ))}
                            </details>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default CitiesListItem