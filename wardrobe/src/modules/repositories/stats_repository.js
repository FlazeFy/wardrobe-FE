import Swal from "sweetalert2"
import { messageError } from "../helpers/message"
import { getLocal, storeLocal } from "../storages/local"

export async function fetchMonthlyClothes(year, onSuccess, onError, tokenKey) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        if(tokenKey) headers['Authorization'] = `Bearer ${tokenKey}`

        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/monthly/created_buyed/${year}`, {
            headers: headers,
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

export async function fetchMostClothesCtx(onSuccess, onError, tokenKey){
    try {
        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/by/clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
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

export async function fetchMostUsedClothesDaily(onSuccess, onError, tokenKey){
    try {
        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/most/used/daily`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
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

export async function fetchYearlyActivity(onSuccess, onError, tokenKey) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        if(tokenKey) headers['Authorization'] = `Bearer ${tokenKey}` 

        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/yearly/clothes_used`, {
            headers: headers,
        })
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

export async function fetchOutfitMonthlyTotalUsed(year, onSuccess, onError, tokenKey){
    try {
        const headers = { 'Content-Type': 'application/json' }
        if(tokenKey) headers['Authorization'] = `Bearer ${tokenKey}` 

        fetch(`http://127.0.0.1:8000/api/v1/stats/outfit/monthly/by_outfit/${year}/all`, {
            headers: headers,
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

export async function fetchOutfitMostUsed(year, onSuccess, onError, tokenKey){
    try {
        const headers = { 'Content-Type': 'application/json' }
        if (tokenKey) headers['Authorization'] = `Bearer ${tokenKey}` 

        fetch(`http://127.0.0.1:8000/api/v1/stats/outfit/most/used/${year}`, {
            headers: headers,
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

export async function fetchYear(now, onSuccess, onError, tokenKey) {
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

        const response = await fetch(`http://127.0.0.1:8000/api/v1/user/my_year`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
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