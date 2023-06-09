import { useState, useCallback, useEffect } from 'react'
import { ReactComponent as CloudLogo } from './assets/cloud.svg'
import {
    getApiKeyFromLocalStore,
    getCitiesFromLocalStore,
    saveApiKeyInLocalStore,
    saveCitiesInLocalStore,
} from './utils/LocalStore'
import SearchCity from './components/SearchCity'
import CitiesList from './components/CitiesList'
import request from './utils/request'
import { getTimeRoundedToMinute } from './utils/Date'
import './App.css'

type Config = {
    apiKey?: string
}

const App = () => {
    const [config, setConfig] = useState<Config>({})
    const [cities, setCities] = useState<CityOrPosition[]>(
        getCitiesFromLocalStore()
    )
    const [refreshKey] = useState<number>(getTimeRoundedToMinute())

    useEffect(() => {
        ;(async () => {
            try {
                const config = await request<Config>(`/parameters.json`, {
                    public: true,
                })
                setConfig(config)
            } catch (e) {
                console.log('error fetching configuration', e)
                const apiKey = getApiKeyFromLocalStore()
                if (apiKey) {
                    console.log('Found apiKey in localStorage')
                    setConfig({ apiKey })
                } else {
                    console.log('No apiKey in localStorage')
                }
            }
        })()
    }, [])

    const setApiKey = useCallback(() => {
        const apiKey = prompt('Please enter OpenWeatherMap API key')
        if (apiKey?.length === 32) {
            setConfig({ apiKey })
            saveApiKeyInLocalStore(apiKey)
        } else {
            alert('API key seems not valid (must be 32 characters long)')
        }
    }, [])

    const onAddCity = useCallback(
        (citywithCountry: CityOrPosition) => {
            const cityAlreadyInList = cities.find(
                (city) => city.label === citywithCountry.label
            )
            if (cityAlreadyInList) {
                return alert('City is already in your list')
            }
            const newCities = cities.concat(citywithCountry)
            setCities(newCities)
            saveCitiesInLocalStore(newCities)
        },
        [cities]
    )

    const onDeleteCity = useCallback(
        (idx: number) => () => {
            if (confirm(`Delete ${cities[idx].label} ?`)) {
                const updatedCities = [...cities]
                updatedCities.splice(idx, 1)
                setCities(updatedCities)
                saveCitiesInLocalStore(updatedCities)
            }
        },
        [cities]
    )

    const onToggleCity = useCallback(
        (idx: number) => () => {
            const updatedCities = cities.map((city, index) => ({
                ...city,
                opened: idx === index ? !city.opened : city.opened,
            }))
            setCities(updatedCities)
            saveCitiesInLocalStore(updatedCities)
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

    return (
        <div className="App">
            <header>
                <CloudLogo className="AppLogo" />
                <h1>Weather</h1>
            </header>
            <CitiesList
                cities={cities}
                onDeleteCity={onDeleteCity}
                apiKey={config.apiKey}
                refreshKey={refreshKey}
                onToggleCity={onToggleCity}
                onTopCity={onTopCity}
                onCitiesRefreshed={onCitiesRefreshed}
            />
            <details className="AddCity" open={cities.length === 0}>
                <summary>Add a city</summary>
                <SearchCity onAddCity={onAddCity} />
            </details>
            <details className="SetApiKey" open={!config.apiKey}>
                <summary>Set API key</summary>
                <p>
                    {!config.apiKey && '⚠ ️'}
                    An{' '}
                    <a href="https://openweathermap.org/" target="_blank">
                        OpenWeatherMap
                    </a>{' '}
                    api key is needed to request weather.
                </p>
                <p>
                    {config.apiKey &&
                        'An API key is already set but you can define another one. '}
                    <a onClick={setApiKey}>Click here to define an API key</a>
                </p>
            </details>
        </div>
    )
}

export default App
