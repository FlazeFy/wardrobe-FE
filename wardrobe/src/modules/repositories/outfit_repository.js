import { getLocal, storeLocal } from "../storages/local"
import apiCall from '@/configs/axios'
import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

const MODULE_URL = "/api/v1/clothes/outfit"

export const postSaveOutfit = async () => {
    try {
        // Payload
        const data = JSON.parse(getLocal('generated_outfit_history'))
        const body = { 'list_outfit' : data }

        // Exec
        let response = await apiCall.post(`${MODULE_URL}/save`, body)
        Swal.hideLoading()
        
        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) localStorage.removeItem('generated_outfit_history')
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const postSaveOutfitHistory = async (id,props) => {
    try {
        // Payload
        const data = {
            outfit_id : id,
            used_context: 'Work'
        }

        // Exec
        let response = await apiCall.post(`${MODULE_URL}/history/save`, JSON.stringify(data))
        
        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    props.fetchOutfit()
                    props.fetchAllHistory()
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const fetchAllOutfit = async (page, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}?page=${page}`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }    
}

export const fetchOutfitMonthlyTotalUsedById = async (id, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/stats/outfit/monthly/by_outfit/2025/${id}`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }    
}

export const deleteOutfitHistoryById = async (id,action) => {
    try {
        let response = await apiCall.delete(`${MODULE_URL}/history/by/${id}`)
        
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

export const fetchOutfitSummary = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-generated_outfit_summary")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null
    
        const fetchData = (data) => {
            onSuccess(data)
        }
    
        if (timeDiffInSec !== null && timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("generated_outfit_summary"))
            fetchData(oldData)
            return
        }
    
        const response = await apiCall.get(`${MODULE_URL}/summary`)
    
        fetchData(response.data.data)
        storeLocal("generated_outfit_summary", JSON.stringify(response.data.data))
        storeLocal("last_hit-generated_outfit_summary", JSON.stringify(now))
    } catch (error) {
        messageError(error)
        onError(error)
    }    
}