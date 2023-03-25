import { useState, useCallback } from 'react'
import SearchCity from './SearchCity'
import cloudLogo from '/cloud.svg'
import './App.css'
import { getCitiesFromLocalStore, saveCitiesInLocalStore } from './LocalStore'
import CitiesList from './CitiesList'

const App = () => {
    const [cities, setCities] = useState<City[]>(getCitiesFromLocalStore)

    const onAddCity = useCallback(
        (citywithCountry: City) => {
            const newCities = cities.concat(citywithCountry)
            setCities(newCities)
            saveCitiesInLocalStore(newCities)
        },
        [cities, setCities]
    )
    const onDeleteCity = useCallback(
        (idx: number) => () => {
            const newCities = [...cities]
            newCities.splice(idx, 1)
            setCities(newCities)
            saveCitiesInLocalStore(newCities)
        },
        [cities, setCities]
    )

    return (
        <div className="App">
            <header>
                <h1>
                    <img src={cloudLogo} alt="" /> Weather{' '}
                </h1>
            </header>
            <CitiesList cities={cities} onDeleteCity={onDeleteCity} />
            <SearchCity onAddCity={onAddCity} />
        </div>
    )
}

export default App
