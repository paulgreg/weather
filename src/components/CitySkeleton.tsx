import './CitySkeleton.css'

export const CitySkeletonLight = () => (
    <div className="CurrentWeather">
        <div className="CurrentWeatherDesc" style={{ height: 120 }}>
            <div style={{ width: 60 }} className="skeleton skeleton-text"></div>
            <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
            <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
            <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
        </div>
    </div>
)

export const CitySkeletonFull = () => (
    <>
        <div className="CurrentWeather">
            <div className="CurrentWeatherDesc" style={{ height: 120 }}>
                <div style={{ width: 60 }} className="skeleton skeleton-text"></div>
                <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
                <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
                <div style={{ width: 200 }} className="skeleton skeleton-text"></div>
            </div>
        </div>
        <div style={{ height: 100 }}>
            <div style={{ marginTop: 60, width: '90%' }} className="skeleton skeleton-text"></div>
        </div>
        <div style={{ height: 100, verticalAlign: 'center' }}>
            <div style={{ marginTop: 60, width: '90%' }} className="skeleton skeleton-text"></div>
        </div>
    </>
)
