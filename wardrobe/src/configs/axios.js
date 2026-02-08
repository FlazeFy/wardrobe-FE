import axios from "axios"

const apiCall = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DEV_BASE_URL
})

apiCall.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token_key")
    
            if (token) config.headers.Authorization = `Bearer ${token}`
        }
    
        return config
    },
    (error) => Promise.reject(error)
)

export default apiCall

