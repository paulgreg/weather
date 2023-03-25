import React from 'react'

type CitiesListType = {
    cities: City[]
    onDeleteCity: (idx: number) => () => void
}
const CitiesList: React.FC<CitiesListType> = ({ cities, onDeleteCity }) => {
    return (
        <section>
            {cities.length === 0 && <div>Please add a city below ⬇️</div>}
            {cities.map((city, idx) => (
                <div key={`${city.city}-${city.lat}-${city.lng}`}>
                    {city.city} <span title={city.country}>{city.code}</span>
                    <button className="delete" onClick={onDeleteCity(idx)}>
                        delete
                    </button>
                </div>
            ))}
        </section>
    )
}

export default CitiesList
