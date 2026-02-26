import { getLocal, storeLocal } from "../storages/local"
import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/stats"

export const getMonthlyClothesRepo = async (year, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/clothes/monthly/created_buyed/${year}`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}

export const getMostClothesCtxRepo = async (onSuccess, onError) => {
    try {
        const response = await apiCall.post(`${MODULE_URL}/clothes/by/clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}

export const getMostUsedClothesDailyRepo = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/clothes/most/used/daily`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}

export const getYearlyActivityRepo = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/clothes/yearly/clothes_used`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}

export const getOutfitMonthlyTotalUsedRepo = async (year, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/outfit/monthly/by_outfit/${year}/all`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}

export const getOutfitMostUsedRepo = async (year, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/outfit/most/used/${year}`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }
}

export const getYearRepo = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-available_year_filter")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null
    
        const fetchData = (data) => {
            onSuccess(data)
        }
    
        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("available_year_filter"))
            fetchData(oldData)
            return
        }
    
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/user/my_year`)
    
        fetchData(response.data.data)
        storeLocal("available_year_filter", JSON.stringify(response.data.data))
        storeLocal("last_hit-available_year_filter", JSON.stringify(now))
    } catch (error) {
        onError(error)
    }    
}