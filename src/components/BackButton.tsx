import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import s from './BackButton.module.css'
import { BackIcon } from './WeatherIcon'

const BackButton = () => {
    const { t } = useTranslation()
    return (
        <div className={s.back}>
            <Link to="/" className={`${s.backButton} button`}>
                <BackIcon className={s.backButtonIcon} />
                {t('back')}
            </Link>
        </div>
    )
}

export default BackButton
