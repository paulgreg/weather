import { alert } from '../types/OpenWeatherTypes'

const WeatherAlerts: React.FC<{ dt: number; alerts: alert[] }> = ({
    dt,
    alerts,
}) => {
    const filteredAlerts = (alerts ?? []).filter((alert) => dt < alert.end)
    if (filteredAlerts?.length === 0) return <></>
    return (
        <details>
            <summary>⚠️ Alerts</summary>
            {filteredAlerts.map((alert) => (
                <div key={alert.event}>
                    <div className="WeatherAlertsItemHeader">
                        <h3>{alert.event}</h3>
                        <small>{alert.sender_name}</small>
                    </div>
                    <div>{alert.description}</div>
                </div>
            ))}
        </details>
    )
}

export default WeatherAlerts
