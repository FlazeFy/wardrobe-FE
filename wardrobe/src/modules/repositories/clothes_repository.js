import Swal from "sweetalert2"
import apiCall from '@/configs/axios'
import { messageError } from "../helpers/message"
import { getLocal, storeLocal } from "../storages/local"

const MODULE_URL = "/api/v1/clothes"

export const postClothes = async (clothesName,clothesDesc,clothesMerk,clothesSize,clothesGender,clothesMadeFrom,clothesCategory,
    clothesType,clothesPrice,clothesBuyAt,clothesQty,clothesImage,isFaded,hasWashed,hasIroned,isFavorite,isScheduled,router) => {
    try {
        Swal.showLoading()

        // Payload
        const formData = new FormData()
        if(clothesBuyAt){
            const todayDate = new Date()
            const clothesBuyAtDate = new Date(clothesBuyAt)

            if(clothesBuyAtDate > todayDate){
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: "You can't set clothes buy at date more than today date",
                    confirmButtonText: "Okay!"
                })
                return
            }
        }
        formData.append("clothes_name", clothesName)
        formData.append("clothes_desc", clothesDesc)
        formData.append("clothes_merk", clothesMerk)
        formData.append("clothes_size", clothesSize)
        formData.append("clothes_gender", clothesGender)
        formData.append("clothes_made_from", clothesMadeFrom)
        formData.append("clothes_color", "black") // for now
        formData.append("clothes_category", clothesCategory)
        formData.append("clothes_type", clothesType)
        formData.append("clothes_price", clothesPrice)
        formData.append("clothes_buy_at", clothesBuyAt)
        formData.append("clothes_qty", clothesQty)
        formData.append("file", clothesImage)
        formData.append("is_faded", isFaded ? 1 : 0)
        formData.append("has_washed", hasWashed ? 1 : 0)
        formData.append("has_ironed", hasIroned ? 1 : 0)
        formData.append("is_favorite", isFavorite ? 1 : 0)
        formData.append("is_scheduled", isScheduled ? 1 : 0)

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/`, formData)
        Swal.close()

        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) router.push(`/clothes/detail/${response.data.data.id}`)
            })
        } 
    } catch (error) {
        messageError(error)
    }
}

export const deleteClothesById = async (id,type_delete,action) => {
    try {
        let response = await apiCall.delete(`${MODULE_URL}/${type_delete == 'hard' ? 'destroy' : 'delete'}/${id}`)
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) action() 
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
} 

export const deleteClothesUsedById = async (id,action) => {
    try {
        let response = await apiCall.delete(`${MODULE_URL}/destroy_used/${id}`)
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) action() 
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const deleteUsedHistoryById = async (id,action) => {
    try {
        let response = await apiCall.delete(`${MODULE_URL}/destroy_used/${id}`)
        
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) action() 
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const recoverClothesById = async (id,action) => {
    try {
        let response = await apiCall.put(`${MODULE_URL}/recover/${id}`)
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) action()
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
} 

export const postSchedule = async (day,isRemind,scheduleNote,props) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "day" : day,
            "is_remind" : isRemind,
            "schedule_note" : scheduleNote,
            "clothes_id" : props.id
        }

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/schedule`, body)
        Swal.close()

        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) props.fetchClothes()
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const postUsedClothes = async (usedContext,clothesNotes,props) => {
    try {
        const body = {
            "clothes_id" : props.id,
            "used_context" : usedContext,
            "clothes_note" : clothesNotes
        }

        const response = await apiCall.post(`${MODULE_URL}/history`, body)

        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed && props.fetchClothes) props.fetchClothes()
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const postOutfitClothes = async (selectedItem,props) => {
    try {
        // Payload
        const body = {
            "outfit_id" : props.id,
            "clothes" : JSON.stringify(selectedItem),
        }

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/outfit/save/clothes`, body)

        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) props.fetchOutfit()
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const fetchClothesSummary = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-stats_summary")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null

        const fetchData = (data) => {
            onSuccess(data)
        }

        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("stats_summary"))
            fetchData(oldData)
            return
        }
        
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/stats/clothes/summary`)

        if (response.status === 200) {
            fetchData(response.data.data)
            storeLocal("stats_summary", JSON.stringify(response.data.data))
            storeLocal("last_hit-stats_summary", JSON.stringify(now))
        } else {
            throw new Error(response.data.message || "Failed to fetch data")
        }
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchTrash = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/trash`)
        onSuccess(response.data.data.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onSuccess(null)
            return
        }

        messageError(error)
        onError(error)
    }
}

export const fetchTotalClothesByType = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`/api/v1/stats/clothes/by/clothes_type`)
        onSuccess(response.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchTodaySchedule = async (dayName, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/schedule/${dayName}`)

        onSuccess(response.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchAllClothesHeader = async (onSuccess, onNotFound, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/header/all/desc`)
        onSuccess(response.data.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onNotFound()
            return
        }

        messageError(error)
        onError(error)
    }
}

export const fetchUnfinishedWash = async (onSuccess, onNotFound, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/wash/unfinished`)
        onSuccess(response.data.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onNotFound()
            return
        }

        messageError(error)
        onError(error)
    }
}

export const fetchTomorrowSchedule = async (day, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/schedule/tomorrow/${day}`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchUsedHistory = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/history/all/desc`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchClothesHeader = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/header/all/desc`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchMonthlyClothesUsed = async (year, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/stats/clothes/monthly/used/${year}`)
        onSuccess(response.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchCalendar = async (month, year, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/stats/calendar/${month}/${year}`)
        onSuccess(response.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchCalendarDetail = async (date,onSuccess,onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/stats/calendar/detail/date/${date}`)
        onSuccess(response.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchLastClothesHistory = async (onSuccess, onNotFound, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/history/last`)
        onSuccess(response.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onNotFound()
            return
        }

        messageError(error)
        onError(error)
    }
}
