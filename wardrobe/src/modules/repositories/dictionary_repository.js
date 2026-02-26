import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1/dct"

export const getDictionaryByTypeRepo = async (onSuccess, onError, dctType) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/${dctType}`)
        onSuccess(response.data.data)
    } catch (error) {
        onError(error)
    }    
}