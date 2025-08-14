import CityWeatherLight from './CityWeatherLight'
import useCities from '../utils/useCities'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CitiesList = () => {
    const { cities, onDeleteCity, onTopCity } = useCities()
    const { t } = useTranslation()

    const buildKey = (city: CityOrPosition) =>
        'myposition' in city ? 'myposition' : `${city.label}-${city.lat}-${city.lng}`

    return (
        <section>
            {cities.length === 0 && (
                <div className="instructions">
                    <Link to="/add" className="button">
                        {t('addCity')}
                    </Link>
                </div>
            )}
            {cities.map((city, idx) => (
                <CityWeatherLight
                    key={buildKey(city)}
                    city={city}
                    onDeleteCity={onDeleteCity(idx)}
                    onTopCity={idx > 0 ? onTopCity(idx) : undefined}
                />
            ))}
        </section>
    )
}

export default CitiesList
