import { useTranslation } from 'react-i18next'
import SearchCity from '../components/SearchCity'
import BackButton from '../components/BackButton'

const AddRoute = () => {
    const { t } = useTranslation()
    return (
        <>
            <h1>{t('addCity')}</h1>
            <SearchCity />
            <BackButton />
        </>
    )
}

export default AddRoute
