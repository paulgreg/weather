import s from './CitySkeleton.module.css'
import currentWeatherStyles from './CurrentWeather.module.css'

export const CitySkeletonLight = () => (
    <div className={currentWeatherStyles.CurrentWeather} style={{ height: 120 }}>
        <div style={{ width: 60 }} className={`${s.skeleton} ${s.skeletonText}`}></div>
        <div style={{ width: 120 }} className={`${s.skeleton} ${s.skeletonText}`}></div>
        <div style={{ width: 120 }} className={`${s.skeleton} ${s.skeletonText}`}></div>
        <div style={{ width: 120 }} className={`${s.skeleton} ${s.skeletonText}`}></div>
    </div>
)

export const CitySkeletonFull = () => (
    <>
        <CitySkeletonLight />
        <div style={{ height: 100 }}>
            <div style={{ marginTop: 60, width: '90%' }} className={`${s.skeleton} ${s.skeletonText}`}></div>
        </div>
        <div style={{ height: 100, verticalAlign: 'center' }}>
            <div style={{ marginTop: 60, width: '90%' }} className={`${s.skeleton} ${s.skeletonText}`}></div>
        </div>
    </>
)
