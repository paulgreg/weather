import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import './BackButton.css'
import { BackIcon } from './WeatherIcon'

const BackButton = () => {
    const { t } = useTranslation()
    return (
        <div className="back">
            <Link to="/" className="backButton button">
                <BackIcon className="backButtonIcon" />
                {t('back')}
            </Link>
        </div>
    )
}

export default BackButton
