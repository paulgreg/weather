import './Header.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CloudIcon, PlusIcon, WrenchIcon } from './WeatherIcon'

const Header = () => {
    const { t } = useTranslation()

    return (
        <header>
            <Link to="/" className="title">
                <span className="logo">
                    <CloudIcon />
                </span>
                <h1>{t('title')}</h1>
            </Link>
            <div>
                <Link to="/config" title={t('config')} className="headerIcon">
                    <WrenchIcon />
                </Link>
                <Link to="/add" title={t('addCity')} className="headerIcon">
                    <PlusIcon />
                </Link>
            </div>
        </header>
    )
}

export default Header
