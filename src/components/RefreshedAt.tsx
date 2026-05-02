import s from './RefreshedAt.module.css'
import { useTranslation } from 'react-i18next'
import { formatDate } from '../utils/Date'

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => {
    const { t } = useTranslation()
    const d = formatDate(t, dt)
    return (
        <div className={s.RefreshedAt}>
            {t('refreshedAt')}{' '}
            <strong>
                {d.hour}:{d.minute}
            </strong>{' '}
            ({d.date}/{d.month}/{d.year})
        </div>
    )
}
export default RefreshedAt
