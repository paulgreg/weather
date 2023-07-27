type Countries = Record<string, Record<string, string>>

type Country = {
    code: string
    country: string
}

type LightCity = {
    label: string
    lat: number
    lng: number
}

type MyPosition = {
    myposition: true
    label: string
}

type City = LightCity & Country

type CityOrPosition = City | MyPosition
