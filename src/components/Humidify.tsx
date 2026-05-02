import { DropletIcon } from './WeatherIcon'
import { useTranslation } from 'react-i18next'
import s from './CurrentWeather.module.css'

const Humidity: React.FC<{ humidity: number }> = ({ humidity }) => {
    const { t } = useTranslation()
    return (
        <div className={s.CurrentWeatherHumidity}>
            <DropletIcon className={s.CurrentWeatherIcon} />
            {t('humidity')}: {humidity} %
        </div>
    )
}
export default Humidity
