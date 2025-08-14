import { useTranslation } from 'react-i18next'
import useConfig from '../utils/useConfig'

const ApiKeyConfig = () => {
    const { t } = useTranslation()
    const { apiKey, setApiKey } = useConfig()
    return (
        <>
            <p>
                {!apiKey && '⚠ ️'}
                {t('apiKeyIntro')}
                {' : '}
                <a href="https://openweathermap.org/" target="_blank">
                    OpenWeatherMap
                </a>.
            </p>
            <p>
                {apiKey && t('apiKeyMsg')} <button onClick={setApiKey}>{t('apiKeySet')}</button>
            </p>
        </>
    )
}

export default ApiKeyConfig
