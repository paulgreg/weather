import BackButton from '../components/BackButton'
import CityWeatherFull from '../components/CityWeatherFull'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCities from '../utils/useCities'

const CityRoute = () => {
    const [errorKey, setErrorKey] = useState<string | undefined>()
    const [city, setCity] = useState<CityOrPosition | undefined>()
    const { cities } = useCities()
    const { t } = useTranslation()
    const { label } = useParams()

    useEffect(() => {
        if (!label) {
            setErrorKey('cityBadUrl')
        } else {
            try {
                const city = cities.find((city) => city.label === label)
                if (!city) throw new Error('city not found')
                setCity(city)
            } catch (e) {
                console.error(e)
                setErrorKey('cityBadUrl')
            }
        }
    }, [])

    return (
        <>
            {city && <CityWeatherFull city={city} />}
            {errorKey && <p>{t(errorKey)}</p>}
            <BackButton />
        </>
    )
}

export default CityRoute
