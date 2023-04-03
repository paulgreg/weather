import {
    AnimatedWeatherIcon,
    StaticWeatherIcon,
    WeatherIconSize,
} from '../components/WeatherIcon'
import { OpenWeatherIcon } from '../types/OpenWeatherTypes'

export const DebugIcons = () => (
    <>
        {[
            OpenWeatherIcon.ClearSky,
            OpenWeatherIcon.ClearSkyNight,
            OpenWeatherIcon.FewClouds,
            OpenWeatherIcon.FewCloudsNight,
            OpenWeatherIcon.ScatteredClouds,
            OpenWeatherIcon.ScatteredCloudsNight,
            OpenWeatherIcon.BrokenClouds,
            OpenWeatherIcon.BrokenCloudsNight,
            OpenWeatherIcon.ShowerRain,
            OpenWeatherIcon.ShowerRainNight,
            OpenWeatherIcon.Rain,
            OpenWeatherIcon.RainNight,
            OpenWeatherIcon.Thunderstorm,
            OpenWeatherIcon.ThunderstormNight,
            OpenWeatherIcon.Snow,
            OpenWeatherIcon.SnowNight,
            OpenWeatherIcon.Mist,
            OpenWeatherIcon.MistNight,
        ].map((i) => (
            <div>
                {i}
                <img src={`https://openweathermap.org/img/wn/${i}@4x.png`} />
                <AnimatedWeatherIcon icon={i} size={WeatherIconSize.L} />
                <StaticWeatherIcon icon={i} size={WeatherIconSize.L} />
            </div>
        ))}
    </>
)
