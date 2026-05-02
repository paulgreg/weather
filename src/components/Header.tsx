import s from './Header.module.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CloudIcon, PlusIcon, RefreshIcon, WrenchIcon } from './WeatherIcon'
import { useCallback } from 'react'

const Header = () => {
    const { t } = useTranslation()
    const onRefreshClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            if (confirm(t('refreshAll'))) globalThis.location.reload()
        },
        [t]
    )

    return (
        <header className={s.header}>
            <Link to="/" className={s.title}>
                <span className={s.logo}>
                    <CloudIcon />
                </span>
                <h1>{t('title')}</h1>
            </Link>
            <div className={s.headerIcons}>
                <Link to="/config" title={t('config')} className={s.headerIcon}>
                    <WrenchIcon />
                </Link>
                <Link to="/add" title={t('addCity')} className={s.headerIcon}>
                    <PlusIcon />
                </Link>
                <span onClick={onRefreshClick} className={s.headerIcon} style={{ marginTop: '2px' }}>
                    <span className={s.headerRefreshIcon}>
                        <RefreshIcon />
                    </span>
                </span>
            </div>
        </header>
    )
}

export default Header
