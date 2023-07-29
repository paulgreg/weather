import { useTranslation } from 'react-i18next'
import { formatDate } from '../utils/Date'

const RefreshedAt: React.FC<{ dt: number }> = ({ dt }) => {
    const { t } = useTranslation()
    const d = formatDate(dt)
    return (
        <small>
            {t('refreshedAt')}{' '}
            <strong>
                {d.hour}:{d.minute}
            </strong>{' '}
            ({d.date}/{d.month}/{d.year})
        </small>
    )
}
export default RefreshedAt
