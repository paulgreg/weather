import './CityTitle.css'
import { useTranslation } from 'react-i18next'
import { ReactComponent as MapSvg } from '../assets/map-fill.svg'

const CityTitle: React.FC<{ city: CityOrPosition; osmUrl?: string }> = ({ city, osmUrl }) => {
    const { t } = useTranslation()
    if ('myposition' in city) {
        return (
            <h1>
                <a href={osmUrl} target="_blank">
                    {t('myPosition')}
                </a>
            </h1>
        )
    }
    return (
        <h1>
            {city.label}{' '}
            <small title={city.country} tabIndex={0}>
                {city.code}
            </small>
            <a href={osmUrl} target="_blank" className="mapLink" title={t('positionOnMap')}>
                <MapSvg />
            </a>
        </h1>
    )
}

export default CityTitle
