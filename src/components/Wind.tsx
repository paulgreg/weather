import { CursorIcon, WindIcon } from './WeatherIcon'
import { useTranslation } from 'react-i18next'

const Wind: React.FC<{
    wind_speed: number
    wind_deg: number
    icon?: boolean
    directionIcon?: boolean
    expanded?: boolean
}> = ({ wind_speed, wind_deg, icon = true, directionIcon = false, expanded = false }) => {
    const { t } = useTranslation()
    const windInKmH = Math.round(wind_speed * (3600 / 1000))
    if (windInKmH === 0) return <div className="CurrentWeatherWind">&nbsp;</div>
    return (
        <div className="CurrentWeatherWind">
            {icon && <WindIcon className="CurrentWeatherIcon" />}
            {expanded && <>{t('wind')} :</>}
            {windInKmH} km/h
            {directionIcon && <CursorIcon rotation={wind_deg + 180} className="CurrentWeatherWindCursor" />}
        </div>
    )
}

export default Wind
