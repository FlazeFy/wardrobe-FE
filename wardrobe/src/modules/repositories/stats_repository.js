import Swal from "sweetalert2"
import { messageError } from "../helpers/message"
import { getLocal, storeLocal } from "../storages/local"

const MODULE_URL = "/api/v1/stats"

export const fetchMonthlyClothes = async (year, onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/clothes/monthly/created_buyed/${year}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
                setError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchMostClothesCtx = async (onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/clothes/by/clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category`, {
            method: 'POST',
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
                setError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchMostUsedClothesDaily = async (onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/clothes/most/used/daily`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
                setError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchYearlyActivity = async (onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/clothes/yearly/clothes_used`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchOutfitMonthlyTotalUsed = async (year, onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/outfit/monthly/by_outfit/${year}/all`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
                setError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchOutfitMostUsed = async (year, onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/outfit/most/used/${year}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
                setError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchYear = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-available_year_filter")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null

        const fetchData = (data) => {
            Swal.close()
            onSuccess(data)
        }

        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("available_year_filter"))
            fetchData(oldData)
            return
        }

        const response = await fetch(`http://127.0.0.1:8000/api/v1/user/my_year`)
        const result = await response.json()

        if (response.ok) {
            fetchData(result.data)
            storeLocal('available_year_filter', JSON.stringify(result.data))
            storeLocal('last_hit-available_year_filter', JSON.stringify(now))
        } else {
            throw new Error(result.message || "Failed to fetch data")
        }
    } catch (error) {
        messageError(error)
        onError(error)
    }
}