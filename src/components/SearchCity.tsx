import './SearchCity.css'
import { useState, useCallback, useEffect } from 'react'
import request from '../utils/request'
import Select, { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useCities from '../utils/useCities'
import { clean, cleanMemo } from '../utils/String'
import { getCountryFromLocalStore, saveCountryInLocalStore } from '../utils/LocalStore'

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

const SearchCity = () => {
    const savedCountry = getCountryFromLocalStore()
    const defaultCountryValue = savedCountry ? { label: savedCountry.country, value: savedCountry.code } : undefined

    const { onAddCity } = useCities()
    const [isLoadingCountries, setIsLoadingCountries] = useState<boolean>(false)
    const [countries, setCountries] = useState<Countries>({})
    const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false)
    const [cities, setCities] = useState<LightCity[]>([])
    const [country, setCountry] = useState<Country | undefined>(savedCountry)
    const [city, setCity] = useState<LightCity>()
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            setIsLoadingCountries(true)
            const countries = await request<Countries>(`cities/countries.json`, t('error'))
            setCountries(countries)
            setIsLoadingCountries(false)
        })()
    }, [t])

    const loadCities = useCallback(
        async (countryCode: string) => {
            setIsLoadingCities(true)
            const cities = await request<LightCity[]>(`cities/${countryCode}.json`, t('error'))
            setCities(cities)
            setIsLoadingCities(false)
        },
        [t]
    )

    useEffect(() => {
        if (country) loadCities(country.code)
    }, [country, loadCities])

    const onCountryChange = useCallback((newValue: SingleValue<CountryOption>) => {
        if (newValue) {
            const { label: countryName, value: countryCode } = newValue
            const country: Country = { code: countryCode, country: countryName }
            setCountry(country)
            saveCountryInLocalStore(country)
        }
    }, [])

    const onCityChange = useCallback((newValue: SingleValue<CityOption>) => {
        if (newValue) {
            const { value: city } = newValue
            setCity(city)
        }
    }, [])

    const filterCities = useCallback(
        (inputValue: string) =>
            Promise.resolve().then(() => {
                if (inputValue?.length < 2) return []
                const query = clean(inputValue)
                return (cities ?? [])
                    .filter(({ label }) => cleanMemo(label).startsWith(query))
                    .map((city) => ({ label: city.label, value: city } as CityOption))
            }),
        [cities]
    )

    const onSubmitCity = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (country && city) {
                onAddCity({
                    ...country,
                    ...city,
                })
                navigate('/')
            }
        },
        [country, city, onAddCity, navigate]
    )

    const onSubmitMyPosition = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            onAddCity({
                myposition: true,
                label: t('myPosition'),
            })
            navigate('/')
        },
        [onAddCity, t, navigate]
    )

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
    return (
        <section className="SearchCity">
            <div className="part">
                <p>
                    <input type="submit" value={`📍 ${t('myPositionAdd')}`} onClick={onSubmitMyPosition} />
                </p>
                <p>{t('or')}</p>
            </div>
            <form onSubmit={onSubmitCity}>
                <label>
                    <span>{t('country')} :</span>
                    <Select
                        classNamePrefix="react-select"
                        className="SearchCityReactSelect"
                        isLoading={isLoadingCountries}
                        placeholder={t('countrySelect')}
                        options={groupedCountriesOptions}
                        onChange={onCountryChange}
                        noOptionsMessage={() => t('noResult')}
                        defaultValue={defaultCountryValue}
                    />
                </label>
                <label>
                    <span>{t('city')} :</span>
                    <AsyncSelect
                        classNamePrefix="react-select"
                        className="SearchCityReactSelect"
                        isDisabled={!country}
                        isLoading={isLoadingCities}
                        placeholder={t('citySelect')}
                        loadOptions={filterCities}
                        onChange={onCityChange}
                        noOptionsMessage={() => t('noResult')}
                    />
                </label>
                <div className="submit">
                    <input type="submit" value={`➕ ${t('add')}`} disabled={!city} />
                </div>
            </form>
        </section>
    )
}

export default SearchCity
