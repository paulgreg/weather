type Countries = Record<string, Record<string, string>>

type Country = {
    code: string
    country: string
}

type LightCity = {
    city: string
    lat: number
    lng: number
}

type City = LightCity & Country