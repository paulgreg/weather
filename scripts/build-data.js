import fs from 'fs'
import path from 'path'
import cities from 'cities.json' with { type: 'json' }
import lookupCountries from 'country-code-lookup'

const dataPath = path.resolve(`./public/cities/`)

const writeFile = (filePath, data) => {
    try {
        const jsonData = JSON.stringify(data)
        fs.writeFileSync(filePath, jsonData)
        console.log(`${filePath} written (size: ${jsonData.length})`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

const countries = cities.reduce((acc, city) => {
    const countryCode = city.country
    const { continent, country } = lookupCountries.byIso(countryCode)
    if (!acc[continent]) {
        acc[continent] = { [countryCode]: country }
        console.log('insert', acc[continent])
    } else if (!acc[continent][countryCode]) {
        acc[continent][countryCode] = country
        console.log('update', acc[continent])
    }
    return acc
}, {})

writeFile(`${dataPath}/countries.json`, countries)

const citiesGroupByCountryCode = cities.reduce((acc, city) => {
    const country = city.country
    if (acc[country]) {
        const { name, lat, lng } = city
        acc[country] = acc[country].concat({ label: name, lat, lng })
    } else {
        acc[country] = []
    }
    return acc
}, {})

Object.keys(citiesGroupByCountryCode).forEach((countryCode) => {
    const citiesSorted = citiesGroupByCountryCode[countryCode].sort(
        (cityA, cityB) => cityA.label.localeCompare(cityB.label)
    )
    writeFile(`${dataPath}/${countryCode}.json`, citiesSorted)
})
