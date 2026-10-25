import BackButton from '../components/BackButton'
import CityWeatherFull from '../components/CityWeatherFull'
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import useCities from '../utils/useCities'

const CityRoute = () => {
    const { cities } = useCities()
    const { t } = useTranslation()
    const { label } = useParams()

    const city = label ? cities.find((c) => c.label === label) : undefined
    const errorKey = label && city ? undefined : 'cityBadUrl'

    return (
        <>
            {city && <CityWeatherFull city={city} />}
            {errorKey && <p>{t(errorKey)}</p>}
            <BackButton />
        </>
    )
}

export default CityRoute
