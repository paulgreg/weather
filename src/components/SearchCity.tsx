import { useState, useCallback, useEffect } from 'react'
import request from '../utils/request'
import './SearchCity.css'

type SearchCityType = {
    onAddCity: (cityWithCountry: City) => void
}

const SearchCity: React.FC<SearchCityType> = ({ onAddCity }) => {
    const [countries, setCountries] = useState<Countries>({})
    const [cities, setCities] = useState<LightCity[]>([])
    const [country, setCountry] = useState<Country>()
    const [city, setCity] = useState<LightCity>()

    useEffect(() => {
        ;(async () => {
            const countries = await request<Countries>(
                `/cities/countries.json`,
                { public: true }
            )
            setCountries(countries)
        })()
    }, [])

    const onCountryChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const countryValue = e.currentTarget.value
            const [countryCode, country] = countryValue.split('-')
            ;(async () => {
                const cities = await request<LightCity[]>(
                    `/cities/${countryCode}.json`,
                    { public: true }
                )
                setCities(cities)
                setCountry({ code: countryCode, country })
            })()
        },
        [setCities]
    )
    const onCityChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const idx = parseInt(e.currentTarget.value, 10)
            setCity(cities[idx])
        },
        [cities, setCity]
    )

    const onCitySelect = useCallback(
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
            <form onSubmit={onCitySelect}>
                <label>
                    Country:
                    <select onChange={onCountryChange}>
                        <option key="---">---</option>
                        {Object.keys(countries).map((continent) => (
                            <optgroup label={continent} key={continent}>
                                {Object.keys(countries[continent]).map(
                                    (countryCode) => (
                                        <option
                                            value={`${countryCode}-${countries[continent][countryCode]}`}
                                            key={countryCode}
                                        >
                                            {countries[continent][countryCode]}
                                        </option>
                                    )
                                )}
                            </optgroup>
                        ))}
                    </select>
                </label>
                <label>
                    City:
                    <select onChange={onCityChange}>
                        <option>---</option>
                        {cities.map((city, idx) => (
                            <option
                                key={`${city.city}-${city.lat}-${city.lng}`}
                                value={idx}
                            >
                                {city.city}
                            </option>
                        ))}
                    </select>
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
