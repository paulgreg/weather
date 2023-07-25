import { useTranslation } from 'react-i18next'
import { alert } from '../types/OpenWeatherTypes'

const WeatherAlerts: React.FC<{ dt: number; alerts: alert[] }> = ({
    dt,
    alerts,
}) => {
    const { t } = useTranslation()
    const filteredAlerts = (alerts ?? []).filter((alert) => dt < alert.end)
    if (filteredAlerts?.length === 0) return <></>
    return (
        <details>
            <summary>⚠️ {t('alerts')}</summary>
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
