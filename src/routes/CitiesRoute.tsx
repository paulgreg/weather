import './CitiesRoute.css'
import { useTranslation } from 'react-i18next'
import CitiesList from '../components/CitiesList'
import useConfig from '../utils/useConfig'
import { Link } from 'react-router-dom'

const CitiesRoute = () => {
    const { t } = useTranslation()
    const { apiKey } = useConfig()
    return (
        <>
            {!apiKey && (
                <div className="instructions">
                    <p>{t('apiKeyIntro')}</p>
                    <p>
                        {' '}
                        <Link to="/config" className="button">
                            {t('apiKeyLink')}
                        </Link>
                    </p>
                </div>
            )}
            {apiKey && <CitiesList />}
        </>
    )
}

export default CitiesRoute
