import { useCallback, useState } from 'react'
import {
    getRefreshKeyFromLocalStore,
    saveRefreshKeyInLocalStore,
} from './LocalStore'

const useRefreshKey = () => {
    const getRefreshKey = () => {
        const refreshKeyFromLocalStorage = getRefreshKeyFromLocalStore()
        if (refreshKeyFromLocalStorage) {
            const refreshKeyParsed = parseInt(refreshKeyFromLocalStorage, 10)
            if (!Number.isNaN(refreshKeyParsed)) {
                return refreshKeyParsed
            }
        }
        return Date.now()
    }

    const [refreshKey, setRefreshKey] = useState(getRefreshKey())

    const updateRefreshKey = useCallback(() => {
        const now = Date.now()
        setRefreshKey(now)
        saveRefreshKeyInLocalStore(now)
    }, [])

    return {
        refreshKey,
        updateRefreshKey,
    }
}

export default useRefreshKey
