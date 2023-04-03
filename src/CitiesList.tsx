import React, { useEffect } from 'react'
import CitiesListItem from './CitiesListItem'

type CitiesListType = {
    cities: City[]
    onDeleteCity: (idx: number) => () => void
    apiKey?: string
    refreshKey: number
}

const CitiesList: React.FC<CitiesListType> = ({
    cities,
    onDeleteCity,
    apiKey,
    refreshKey,
}) => {
    return (
        <section>
            {cities.map((city, idx) => (
                <CitiesListItem
                    key={`${city.city}-${city.lat}-${city.lng}-${idx}`}
                    city={city}
                    onDeleteCity={onDeleteCity(idx)}
                    apiKey={apiKey}
                    refreshKey={refreshKey}
                />
            ))}
        </section>
    )
}

export default CitiesList
