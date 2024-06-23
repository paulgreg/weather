import './Header.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CloudIcon, PlusIcon, RefreshIcon, WrenchIcon } from './WeatherIcon'
import { useCallback } from 'react'

const Header = () => {
    const { t } = useTranslation()
    const onRefreshClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        if (confirm(t('refreshAll'))) window.location.reload()
    }, [])

    return (
        <header>
            <Link to="/" className="title">
                <span className="logo">
                    <CloudIcon />
                </span>
                <h1>{t('title')}</h1>
            </Link>
            <div className="headerIcons">
                <Link to="/config" title={t('config')} className="headerIcon">
                    <WrenchIcon />
                </Link>
                <Link to="/add" title={t('addCity')} className="headerIcon">
                    <PlusIcon />
                </Link>
                <span onClick={onRefreshClick} className="headerIcon" style={{ marginTop: '2px' }}>
                    <span className="headerRefreshIcon">
                        <RefreshIcon />
                    </span>
                </span>
            </div>
        </header>
    )
}

export default Header
