import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import SearchCity from '../components/SearchCity'
import BackButton from '../components/BackButton'

const AddRoute = () => {
    const { t } = useTranslation()
    return (
        <>
            <Header />
            <h1>{t('addCity')}</h1>
            <SearchCity />
            <BackButton />
        </>
    )
}

export default AddRoute
