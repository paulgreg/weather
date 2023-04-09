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

import './App.css'

type Config = {
    apiKey?: string
}

const MINUTE = 60_000
const AUTO_REFRESH_DELAY = 60 * MINUTE // 1 hour
const DELAY_HIDE_REFRESH_BUTTON = MINUTE

const App = () => {
    const [config, setConfig] = useState<Config>({})
    const [cities, setCities] = useState<City[]>(getCitiesFromLocalStore)
    const [refreshKey, setRefreshKey] = useState<number>(Date.now())
    const [allowRefresh, setAllowRefresh] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)

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
    }, [setConfig])

    const setApiKey = useCallback(() => {
        const apiKey = prompt('Please enter OpenWeatherMap API key')
        if (apiKey?.length === 32) {
            setConfig({ apiKey })
            saveApiKeyInLocalStore(apiKey)
        } else {
            alert('API key seems not valid (must be 32 characters long)')
        }
    }, [setConfig])

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
            if (confirm(`Delete ${cities[idx].label} ?`)) {
                const newCities = [...cities]
                newCities.splice(idx, 1)
                setCities(newCities)
                saveCitiesInLocalStore(newCities)
            }
        },
        [cities, setCities]
    )
    const onRefresh = useCallback(() => {
        setRefreshKey(Date.now())
        setRefreshing(true)
    }, [refreshKey])

    const onCitiesRefreshed = useCallback((success: boolean) => {
        setRefreshing(false)
        if (success) {
            setAllowRefresh(false)
        }
    }, [])

    useEffect(() => {
        const allowTimeout = setTimeout(() => {
            setAllowRefresh(true)
        }, DELAY_HIDE_REFRESH_BUTTON)
        return () => {
            clearTimeout(allowTimeout)
        }
    }, [refreshKey, setAllowRefresh])

    const autoRefresh = useCallback(() => {
        const now = Date.now()
        const delta = now - refreshKey
        if (delta > AUTO_REFRESH_DELAY) {
            setRefreshKey(now)
        }
    }, [refreshKey, setRefreshKey])

    useEffect(() => {
        document.addEventListener('visibilitychange', autoRefresh, false)
        return () => {
            document.removeEventListener('visibilitychange', autoRefresh)
        }
    }, [autoRefresh])

    return (
        <div className="App">
            <header>
                <CloudLogo className="AppLogo" />
                <h1>Weather</h1>
                <span>
                    {cities.length > 0 && allowRefresh && (
                        <button onClick={onRefresh} disabled={refreshing}>
                            🔄 refresh data
                        </button>
                    )}
                </span>
            </header>
            <CitiesList
                cities={cities}
                onDeleteCity={onDeleteCity}
                apiKey={config.apiKey}
                refreshKey={refreshKey}
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
