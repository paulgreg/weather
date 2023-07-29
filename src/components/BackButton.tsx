import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ReactComponent as BackSvg } from '../assets/arrow-left.svg'

import './BackButton.css'

const BackButton = () => {
    const { t } = useTranslation()
    return (
        <div className="back">
            <Link to="/" className="backButton button">
                <BackSvg />
                {t('back')}
            </Link>
        </div>
    )
}

export default BackButton
