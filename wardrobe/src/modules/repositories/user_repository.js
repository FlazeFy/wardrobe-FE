import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/user"

export const getRefreshTokenRepo = async () => {
    try {
        const res = await apiCall.get(`${MODULE_URL}/refresh`)
        if (!res.status === 200) return null

        return {
            username: res.data.message.username,
            email: res.data.message.email,
            role: res.data.role,
        }
    } catch (error) {
        // Reset local storage if refresh token is error (possibly expired)
        localStorage.clear()
        return null
    }
}

export const getMyProfileRepo = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/my`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}