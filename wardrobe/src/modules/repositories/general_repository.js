import Swal from "sweetalert2"
import { getLocal, storeLocal } from '../../modules/storages/local.js'

export const fetchWelcomeStats = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-welcome_stats")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null
    
        const fetchData = (data) => {
            onSuccess(data)
        }
    
        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("welcome_stats"))
            fetchData(oldData)
            return
        }
    
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/stats/all`)
    
        fetchData(response.data.data)
        storeLocal("welcome_stats", JSON.stringify(response.data.data))
        storeLocal("last_hit-welcome_stats", JSON.stringify(now))
    } catch (error) {
        messageError(error)
        onError(error)
    }    
}
