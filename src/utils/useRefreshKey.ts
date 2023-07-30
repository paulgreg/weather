import { useState } from 'react'
import { getTimeRoundedToHour } from './Date'

const useRefreshKey = () => {
    const [refreshKey] = useState<number>(getTimeRoundedToHour())

    return { refreshKey }
}

export default useRefreshKey
