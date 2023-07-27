import { useState, useCallback, useEffect } from 'react'
import { getCitiesFromLocalStore, saveCitiesInLocalStore } from './LocalStore'
import { getTimeRoundedToMinute } from './Date'
import { useTranslation } from 'react-i18next'

const useCities = () => {
    const [cities, setCities] = useState<CityOrPosition[]>(getCitiesFromLocalStore())
    const [refreshKey] = useState<number>(getTimeRoundedToMinute())
    const { t } = useTranslation()

    const onAddCity = useCallback(
        (citywithCountry: CityOrPosition) => {
            const cityAlreadyInList = cities.find((city) => city.label === citywithCountry.label)
            if (cityAlreadyInList) {
                return alert(t('cityAlreadyInList'))
            }
            const newCities = cities.concat(citywithCountry)
            setCities(newCities)
            saveCitiesInLocalStore(newCities)
        },
        [cities]
    )

    const onDeleteCity = useCallback(
        (idx: number) => () => {
            if (confirm(`${t('delete')} ${cities[idx].label} ?`)) {
                const updatedCities = [...cities]
                updatedCities.splice(idx, 1)
                setCities(updatedCities)
                saveCitiesInLocalStore(updatedCities)
            }
        },
        [cities]
    )

    const onTopCity = useCallback(
        (idx: number) => () => {
            const wipCities = [...cities]
            const cityToPutOnTop = wipCities.splice(idx, 1)
            const updatedCities = cityToPutOnTop.concat(wipCities)
            setCities(updatedCities)
            saveCitiesInLocalStore(updatedCities)
        },
        [cities]
    )

    const onCitiesRefreshed = useCallback((success: boolean) => {
        console.log('onCitiesRefreshed', success)
    }, [])

    return { cities, onAddCity, onDeleteCity, onTopCity, onCitiesRefreshed, refreshKey }
}

export default useCities
