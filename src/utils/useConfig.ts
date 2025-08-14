import { useState, useCallback, useEffect } from 'react'
import { getApiKeyFromLocalStore, saveApiKeyInLocalStore } from './LocalStore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import request from './request'
import type { ConfigType } from '../types/ConfigTypes'

let configCache: ConfigType

const useConfig = () => {
    const [config, setConfig] = useState<ConfigType>({})
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            if (config.apiKey) return
            if (configCache?.apiKey) {
                setConfig(configCache)
            } else {
                try {
                    const configFromServer = await request<ConfigType>(`parameters.json`, t('error'))
                    configCache = configFromServer
                    setConfig(configFromServer)
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
            }
        })()
    }, [config, t])

    const setApiKey = useCallback(() => {
        const apiKey = prompt(t('apiKeyPrompt'))
        if (apiKey?.length === 32) {
            setConfig({ apiKey })
            saveApiKeyInLocalStore(apiKey)
            navigate('/')
        } else {
            alert(t('apiKeyInvalid'))
        }
    }, [navigate, t])

    return {
        apiKey: config?.apiKey,
        setApiKey,
    }
}

export default useConfig
