import Swal from "sweetalert2"
import apiCall from '@/configs/axios'
import { messageError } from "../helpers/message"

const MODULE_URL = "/api/v1/clothes/wash"

export const fetchWashClothes = async (page, onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}/history?page=${page}&is_detailed=true`)
        .then(res => {
            if (res.status === 404) {
                onSuccess(res)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) onSuccess(result)
            Swal.close()
        })
        .catch(error => {
            messageError(error)
            onError(error)
        })
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const fetchWashSummary = async (onSuccess, onError) => {
    try {
        fetch(`http://127.0.0.1:8000/api/v1/stats/wash/summary`)
        .then(res => {
            if (res.status === 404) {
                onSuccess(res)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) onSuccess(result)
            Swal.close()
        })
        .catch(error => {
            messageError(error)
            onError(error)
        })
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const deleteWashById = async (id,action) => {
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
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}