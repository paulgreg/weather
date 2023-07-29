import './Header.css'
import { ReactComponent as CloudSvg } from '../assets/cloud.svg'
import { ReactComponent as PlusSvg } from '../assets/plus-circle-fill.svg'
import { ReactComponent as WrenchSvg } from '../assets/wrench-adjustable-circle-fill.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Header = () => {
    const { t } = useTranslation()
    return (
        <header>
            <Link to="/" className="title">
                <span className="logo">
                    <CloudSvg />
                </span>
                <h1>{t('title')}</h1>
            </Link>
            <div>
                <Link to="/config" title={t('config')} className="headerIcon">
                    <WrenchSvg />
                </Link>
                <Link to="/add" title={t('addCity')} className="headerIcon">
                    <PlusSvg />
                </Link>
            </div>
        </header>
    )
}

export default Header
