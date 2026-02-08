import apiCall from "@/configs/axios"

const MODULE_URL = "/api/v1/stats"

export async function fetchRefreshToken() {
    try {
        const res = await apiCall.get(`${MODULE_URL}/refresh`)
        if (!res.status === 200) return null

        return {
            username: res.message.username,
            email: res.message.email,
            role: res.role,
        }
    } catch (error) {
        console.error("refresh token error:", error)
        return null
    }
}