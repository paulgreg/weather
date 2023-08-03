import { useTranslation } from 'react-i18next'

const CityTitle: React.FC<{ city: CityOrPosition }> = ({ city }) => {
    const { t } = useTranslation()
    if ('myposition' in city) {
        return <h1>{t('myPosition')}</h1>
    }
    return (
        <h1>
            {city.label}{' '}
            <small title={city.country} tabIndex={0}>
                {city.code}
            </small>
        </h1>
    )
}

export default CityTitle
