import { OpenWeatherIcon } from '../types/OpenWeatherTypes'

import AnimatedClearDay from '../assets/weather/animated/clear-day.svg'
import AnimatedCloudDay from '../assets/weather/animated/cloudy-1-day.svg'
import AnimatedCloudNight from '../assets/weather/animated/cloudy-1-night.svg'
import AnimatedClouds from '../assets/weather/animated/cloudy.svg'
import AnimatedFog from '../assets/weather/animated/fog.svg'
import AnimatedThunderstorms from '../assets/weather/animated/isolated-thunderstorms.svg'
import AnimatedRainyDay from '../assets/weather/animated/rainy-2-day.svg'
import AnimatedRainyNight from '../assets/weather/animated/rainy-2-night.svg'
import AnimatedRain from '../assets/weather/animated/rainy-3.svg'

import StaticClearDay from '../assets/weather/static/clear-day.svg'
import StaticClearNight from '../assets/weather/static/clear-night.svg'
import StaticCloudDay from '../assets/weather/static/cloudy-1-day.svg'
import StaticCloudNight from '../assets/weather/static/cloudy-1-night.svg'
import StaticClouds from '../assets/weather/static/cloudy.svg'
import StaticFog from '../assets/weather/static/fog.svg'
import StaticThunderstorms from '../assets/weather/static/isolated-thunderstorms.svg'
import StaticRainyDay from '../assets/weather/static/rainy-2-day.svg'
import StaticRainyNight from '../assets/weather/static/rainy-2-night.svg'
import StaticRain from '../assets/weather/static/rainy-3.svg'
import StaticSnow from '../assets/weather/static/snow.svg'

import ThermometerHalf from '../assets/thermometer-half.svg'
import ThermometerHigh from '../assets/thermometer-high.svg'

import Wind from '../assets/wind.svg'
import Droplet from '../assets/droplet.svg'
import Sun from '../assets/sun.svg'
import Moon from '../assets/moon.svg'
import Cursor from '../assets/cursor.svg'
import Back from '../assets/arrow-left.svg'
import Info from '../assets/info-circle.svg'
import Refresh from '../assets/arrow-clockwise.svg'
import ArrowUp from '../assets/arrow-up-circle-fill.svg'
import Dash from '../assets/dash-circle-fill.svg'
import Cloud from '../assets/cloud.svg'
import Plus from '../assets/plus-circle-fill.svg'
import Wrench from '../assets/wrench-adjustable-circle-fill.svg'

export const enum WeatherIconSize {
    XXXS = '10px',
    XXS = '14px',
    XS = '20px',
    S = '30px',
    M = '50px',
    L = '160px',
}

const getAnimatedIcon = (icon: OpenWeatherIcon) => {
    switch (icon) {
        case OpenWeatherIcon.ClearSky:
            return AnimatedClearDay
        case OpenWeatherIcon.ClearSkyNight:
            return StaticClearNight
        case OpenWeatherIcon.FewClouds:
            return AnimatedCloudDay
        case OpenWeatherIcon.FewCloudsNight:
            return AnimatedCloudNight
        case OpenWeatherIcon.ScatteredClouds:
        case OpenWeatherIcon.ScatteredCloudsNight:
        case OpenWeatherIcon.BrokenClouds:
        case OpenWeatherIcon.BrokenCloudsNight:
            return AnimatedClouds
        case OpenWeatherIcon.ShowerRain:
        case OpenWeatherIcon.ShowerRainNight:
            return AnimatedRain
        case OpenWeatherIcon.Rain:
            return AnimatedRainyDay
        case OpenWeatherIcon.RainNight:
            return AnimatedRainyNight
        case OpenWeatherIcon.Thunderstorm:
        case OpenWeatherIcon.ThunderstormNight:
            return AnimatedThunderstorms
        case OpenWeatherIcon.Snow:
        case OpenWeatherIcon.SnowNight:
            return StaticSnow
        case OpenWeatherIcon.Mist:
        case OpenWeatherIcon.MistNight:
            return AnimatedFog
    }
}

const getStaticdIcon = (icon: OpenWeatherIcon) => {
    switch (icon) {
        case OpenWeatherIcon.ClearSky:
            return StaticClearDay
        case OpenWeatherIcon.ClearSkyNight:
            return StaticClearNight
        case OpenWeatherIcon.FewClouds:
            return StaticCloudDay
        case OpenWeatherIcon.FewCloudsNight:
            return StaticCloudNight
        case OpenWeatherIcon.ScatteredClouds:
        case OpenWeatherIcon.ScatteredCloudsNight:
        case OpenWeatherIcon.BrokenClouds:
        case OpenWeatherIcon.BrokenCloudsNight:
            return StaticClouds
        case OpenWeatherIcon.ShowerRain:
        case OpenWeatherIcon.ShowerRainNight:
            return StaticRain
        case OpenWeatherIcon.Rain:
            return StaticRainyDay
        case OpenWeatherIcon.RainNight:
            return StaticRainyNight
        case OpenWeatherIcon.Thunderstorm:
        case OpenWeatherIcon.ThunderstormNight:
            return StaticThunderstorms
        case OpenWeatherIcon.Snow:
        case OpenWeatherIcon.SnowNight:
            return StaticSnow
        case OpenWeatherIcon.Mist:
        case OpenWeatherIcon.MistNight:
            return StaticFog
    }
}

const WeatherIcon: React.FC<{
    icon: OpenWeatherIcon
    animated: boolean
    size: WeatherIconSize
}> = ({ icon, animated, size = WeatherIconSize.M }) => (
    <img
        src={animated ? getAnimatedIcon(icon) : getStaticdIcon(icon)}
        style={{
            width: size,
            height: size,
        }}
    />
)
// Reference:
// <img src={`https://openweathermap.org/img/wn/${icon}${ size === WeatherIconSize.BIG ? '@4x' : '' }.png`} />

export const AnimatedWeatherIcon: React.FC<{
    icon: OpenWeatherIcon
    size?: WeatherIconSize
}> = ({ icon, size = WeatherIconSize.M }) => <WeatherIcon icon={icon} animated={true} size={size} />

export const StaticWeatherIcon: React.FC<{
    icon: OpenWeatherIcon
    size?: WeatherIconSize
}> = ({ icon, size = WeatherIconSize.M }) => <WeatherIcon icon={icon} animated={false} size={size} />

export const ThermometerIcon: React.FC<{
    high?: boolean
    size?: WeatherIconSize
}> = ({ high = false, size = WeatherIconSize.XS }) => (
    <img
        src={high ? ThermometerHigh : ThermometerHalf}
        style={{
            width: size,
            height: size,
        }}
        className="invertable"
    />
)

const SvgIcon: React.FC<{
    icon: string
    className?: string
    size?: WeatherIconSize
    style?: Record<string, string>
}> = ({ icon, className = '', size = WeatherIconSize.XS, style = {} }) => (
    <img
        src={icon}
        style={{
            width: size,
            height: size,
            ...style,
        }}
        className={`invertable ${className}`}
    />
)

export const WindIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size, className }) => <SvgIcon icon={Wind} size={size} className={className} />

export const DropletIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size, className }) => <SvgIcon icon={Droplet} size={size} className={className} />

export const SunIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size, className }) => <SvgIcon icon={Sun} size={size} className={className} />

export const MoonIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size, className }) => <SvgIcon icon={Moon} size={size} className={className} />

export const CursorIcon: React.FC<{
    rotation?: number
    className?: string
}> = ({ rotation = 0, className }) => (
    <SvgIcon
        icon={Cursor}
        size={WeatherIconSize.XS}
        className={className}
        style={{
            transform: `rotate(${rotation}deg)`,
        }}
    />
)

export const BackIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size, className }) => <SvgIcon icon={Back} size={size} className={className} />

export const InfoIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.XS, className }) => <SvgIcon icon={Info} size={size} className={className} />

export const RefreshIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.XS, className }) => <SvgIcon icon={Refresh} size={size} className={className} />

export const ArrowUpIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.XS, className }) => <SvgIcon icon={ArrowUp} size={size} className={className} />

export const DashIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.XS, className }) => <SvgIcon icon={Dash} size={size} className={className} />

export const CloudIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.S, className }) => <SvgIcon icon={Cloud} size={size} className={className} />

export const PlusIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.S, className }) => <SvgIcon icon={Plus} size={size} className={className} />

export const WrenchIcon: React.FC<{
    size?: WeatherIconSize
    className?: string
}> = ({ size = WeatherIconSize.S, className }) => <SvgIcon icon={Wrench} size={size} className={className} />
