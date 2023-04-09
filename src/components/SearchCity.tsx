import { useState, useCallback, useEffect } from 'react'
import request from '../utils/request'
import Select, { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'

import './SearchCity.css'
import reactSelect from 'react-select'

type SearchCityType = {
    onAddCity: (cityWithCountry: City) => void
}

type CountryOption = {
    readonly label: string
    readonly value: string
}

type GroupCountryOption = {
    readonly label: string
    readonly options: CountryOption[]
}

type CityOption = {
    readonly label: string
    readonly value: LightCity
}

const SearchCity: React.FC<SearchCityType> = ({ onAddCity }) => {
    const [isLoadingCountries, setLoadingCountries] = useState<boolean>(false)
    const [countries, setCountries] = useState<Countries>({})
    const [isLoadingCities, setLoadingCities] = useState<boolean>(false)
    const [cities, setCities] = useState<LightCity[]>([])
    const [country, setCountry] = useState<Country>()
    const [city, setCity] = useState<LightCity>()

    useEffect(() => {
        ;(async () => {
            setLoadingCountries(true)
            const countries = await request<Countries>(
                `/cities/countries.json`,
                { public: true }
            )
            setCountries(countries)
            setLoadingCountries(false)
        })()
    }, [])

    const groupedCountriesOptions = Object.keys(countries).map(
        (continent) =>
            ({
                label: continent,
                options: Object.keys(countries[continent]).map(
                    (countryCode) =>
                        ({
                            label: countries[continent][countryCode],
                            value: countryCode,
                        } as CountryOption)
                ),
            } as GroupCountryOption)
    )

    const onCountryChange = useCallback((newValue: SingleValue<any>) => {
        if (newValue) {
            ;(async () => {
                setLoadingCities(true)
                const { label: country, value: countryCode } = newValue
                const cities = await request<LightCity[]>(
                    `/cities/${countryCode}.json`,
                    { public: true }
                )
                setCities(cities)
                setCountry({ code: countryCode, country: country })
                setLoadingCities(false)
            })()
        }
    }, [])

    const onCityChange = useCallback(
        (newValue: SingleValue<any>) => {
            const { value } = newValue
            if (value) {
                setCity(value)
            }
        },
        [cities]
    )

    const loadCitiesOptions = (inputValue: string) =>
        Promise.resolve().then(() => {
            if (inputValue?.length < 2) return []
            const query = inputValue.toLocaleLowerCase()
            return (cities ?? [])
                .filter(({ label }) => label.toLowerCase().startsWith(query))
                .map(
                    (city) => ({ label: city.label, value: city } as CityOption)
                )
        })

    const onSubmitCity = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (country && city) {
                const countryWithCity: City = { ...country, ...city }
                onAddCity(countryWithCity)
            }
        },
        [country, city]
    )

    return (
        <section className="SearchCity">
            <form onSubmit={onSubmitCity}>
                <label>
                    <span>Country:</span>
                    <Select
                        className="SearchCityReactSelect"
                        isLoading={isLoadingCountries}
                        placeholder="Select a country"
                        options={groupedCountriesOptions}
                        onChange={onCountryChange}
                    />
                </label>
                <label>
                    <span>City:</span>
                    <AsyncSelect
                        className="SearchCityReactSelect"
                        isDisabled={!country}
                        isLoading={isLoadingCities}
                        placeholder="Start typing a city"
                        loadOptions={loadCitiesOptions}
                        onChange={onCityChange}
                    />
                </label>
                <div className="submit">
                    <input
                        type="submit"
                        value="➕ add"
                        disabled={!Boolean(city)}
                    />
                </div>
            </form>
        </section>
    )
}

export default SearchCity
