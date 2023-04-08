type OpenWeatherWeather = {
    id: number
    main: string
    description: string
    icon: OpenWeatherIcon
}

type OpenWeatherCommonPart = {
    dt: number
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    clouds: number
    uvi: number
    weather: OpenWeatherWeather[]
}

export type OpenWeatherCurrentPart = OpenWeatherCommonPart & {
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    visibility: number
}

export type OpenWeatherHourlyPart = OpenWeatherCommonPart & {
    temp: number
    feels_like: number
    visibility: number
    wind_gust: number
    pop: number
    rain?: Record<string, number>
}

export type OpenWeatherDailyPart = OpenWeatherCommonPart & {
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
    }
    feels_like: {
        day: number
        night: number
        eve: number
        morn: number
    }
    wind_gust: number
    pop: number
    rain?: number
}

export type alert = {
    sender_name: string
    event: string
    start: number
    end: number
    description: string
    tags: string[]
}

export type OpenWeatherResponse = {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: OpenWeatherCurrentPart
    hourly: OpenWeatherHourlyPart[]
    daily: OpenWeatherDailyPart[]
    alerts: alert[]
}

export const enum OpenWeatherIcon {
    ClearSky = '01d',
    ClearSkyNight = '01n',

    FewClouds = '02d',
    FewCloudsNight = '02n',

    ScatteredClouds = '03d',
    ScatteredCloudsNight = '03n',

    BrokenClouds = '04d',
    BrokenCloudsNight = '04n',

    ShowerRain = '09d',
    ShowerRainNight = '09n',

    Rain = '10d',
    RainNight = '10n',

    Thunderstorm = '11d',
    ThunderstormNight = '11n',

    Snow = '13d',
    SnowNight = '13n',

    Mist = '50d',
    MistNight = '50n',
}
