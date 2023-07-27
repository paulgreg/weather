import { useState, useCallback, useEffect } from 'react'
import { getApiKeyFromLocalStore, saveApiKeyInLocalStore } from './LocalStore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import request from './request'

const useConfig = () => {
    const [config, setConfig] = useState<Config>({})
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const config = await request<Config>(`/parameters.json`, {
                    public: true,
                })
                setConfig(config)
            } catch (e) {
                console.log('error fetching configuration', e)
                const apiKey = getApiKeyFromLocalStore()
                if (apiKey) {
                    console.log('Found apiKey in localStorage')
                    setConfig({ apiKey })
                } else {
                    console.log('No apiKey in localStorage')
                }
            }
        })()
    }, [])

    const setApiKey = useCallback(() => {
        const apiKey = prompt(t('apiKeyPrompt'))
        if (apiKey?.length === 32) {
            setConfig({ apiKey })
            saveApiKeyInLocalStore(apiKey)
            navigate('/')
        } else {
            alert(t('apiKeyInvalid'))
        }
    }, [])

    return {
        apiKey: config?.apiKey,
        setApiKey,
    }
}

export default useConfig
