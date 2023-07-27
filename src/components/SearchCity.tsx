import './SearchCity.css'
import { useState, useCallback, useEffect } from 'react'
import request from '../utils/request'
import Select, { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useCities from '../utils/useCities'

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
    const { onAddCity } = useCities()
    const [isLoadingCountries, setLoadingCountries] = useState<boolean>(false)
    const [countries, setCountries] = useState<Countries>({})
    const [isLoadingCities, setLoadingCities] = useState<boolean>(false)
    const [cities, setCities] = useState<LightCity[]>([])
    const [country, setCountry] = useState<Country>()
    const [city, setCity] = useState<LightCity>()
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            setLoadingCountries(true)
            const countries = await request<Countries>(`/cities/countries.json`)
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
                const cities = await request<LightCity[]>(`/cities/${countryCode}.json`)
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
                .map((city) => ({ label: city.label, value: city } as CityOption))
        })

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
        [country, city, onAddCity]
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
        [country, city]
    )

    return (
        <>
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
                            loadOptions={loadCitiesOptions}
                            onChange={onCityChange}
                            noOptionsMessage={() => t('noResult')}
                        />
                    </label>
                    <div className="submit">
                        <input type="submit" value={`➕ ${t('add')}`} disabled={!Boolean(city)} />
                    </div>
                </form>
            </section>
        </>
    )
}

export default SearchCity
