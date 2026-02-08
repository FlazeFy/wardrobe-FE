import Swal from "sweetalert2"
import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1/clothes/wash"

export const fetchWashClothes = async (page, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/history?page=${page}&is_detailed=true`)
        onSuccess(response.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onSuccess(error.response)
            return
        }
    
        onError(error)
    }    
}

export const fetchWashSummary = async (onSuccess, onError) => {
    try {
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/stats/wash/summary`)
        onSuccess(response.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onSuccess(error.response)
            return
        }
    
        onError(error)
    }    
}

export const deleteWashById = async (id, action, onError) => {
    try {
        let response = await apiCall.delete(`http://127.0.0.1:8000/api/v1/clothes/destroy_wash/${id}`)
        
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
            onError("Something went wrong!")
        }
    } catch (error) {
        onError(error)
    }
}