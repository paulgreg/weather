import { useState, useCallback } from 'react'
import { getCitiesFromLocalStore, saveCitiesInLocalStore } from './LocalStore'
import { useTranslation } from 'react-i18next'

const useCities = () => {
    const [cities, setCities] = useState<CityOrPosition[]>(getCitiesFromLocalStore())
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
        [cities, t]
    )

    const onDeleteCity = useCallback(
        (idx: number) => (e: React.MouseEvent) => {
            e.stopPropagation()
            if (confirm(`${t('delete')} ${cities[idx].label} ?`)) {
                const updatedCities = [...cities]
                updatedCities.splice(idx, 1)
                setCities(updatedCities)
                saveCitiesInLocalStore(updatedCities)
            }
        },
        [cities, t]
    )

    const onTopCity = useCallback(
        (idx: number) => (e: React.MouseEvent) => {
            e.stopPropagation()
            const wipCities = [...cities]
            const cityToPutOnTop = wipCities.splice(idx, 1)
            const updatedCities = cityToPutOnTop.concat(wipCities)
            setCities(updatedCities)
            saveCitiesInLocalStore(updatedCities)
        },
        [cities]
    )

    return { cities, onAddCity, onDeleteCity, onTopCity }
}

export default useCities
