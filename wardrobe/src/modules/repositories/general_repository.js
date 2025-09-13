import Swal from "sweetalert2"
import { getLocal, storeLocal } from '../../modules/storages/local.js'

export async function fetchWelcomeStats(now, onSuccess, onError) {
    try {
        const oldTimeHit = getLocal("last_hit-welcome_stats")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null

        const fetchData = (data) => {
            Swal.close()
            onSuccess(data)
        }

        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("welcome_stats"))
            fetchData(oldData)
            return
        }

        const response = await fetch(`http://127.0.0.1:8000/api/v1/stats/all`)
        const result = await response.json()

        if (response.ok) {
            fetchData(result.data)
            storeLocal("welcome_stats", JSON.stringify(result.data))
            storeLocal("last_hit-welcome_stats", JSON.stringify(now))
        } else {
            throw new Error(result.message || "Failed to fetch data")
        }
    } catch (error) {
        messageError(error)
        onError(error)
    }
}
