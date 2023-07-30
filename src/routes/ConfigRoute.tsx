import { useTranslation } from 'react-i18next'
import ApiKeyConfig from '../components/ApiKeyConfig'
import BackButton from '../components/BackButton'

const ConfigRoute = () => {
    const { t } = useTranslation()

    return (
        <>
            <h1>{t('apiKeyTitle')}</h1>
            <ApiKeyConfig />
            <BackButton />
        </>
    )
}
export default ConfigRoute
