import { useCallback, useState } from 'react'
import { getTimeRoundedToHour } from './Date'

const useRefreshKey = () => {
    const [refreshKey, setRefreshKey] = useState<number>(getTimeRoundedToHour())

    const updateRefreshKey = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setRefreshKey(getTimeRoundedToHour())
    }, [])

    return { refreshKey, updateRefreshKey }
}

export default useRefreshKey
