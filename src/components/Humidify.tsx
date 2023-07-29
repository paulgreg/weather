import { DropletIcon } from './WeatherIcon'
import { useTranslation } from 'react-i18next'

const Humidity: React.FC<{ humidity: number }> = ({ humidity }) => {
    const { t } = useTranslation()
    return (
        <div className="CurrentWeatherHumidity">
            <DropletIcon className="CurrentWeatherIcon" />
            {t('humidity')}: {humidity} %
        </div>
    )
}
export default Humidity
