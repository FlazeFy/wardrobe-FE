import Swal from "sweetalert2"
import Axios from 'axios'
import { messageError } from "../helpers/message"

export async function fetchWashClothes(page, onSuccess, onError, tokenKey){
    try {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/wash/history?page=${page}&is_detailed=true`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}` 
            }
        })
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

export async function fetchWashSummary(onSuccess, onError, tokenKey){
    try {
        fetch(`http://127.0.0.1:8000/api/v1/stats/wash/summary`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
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

export const deleteWashById = async (id,tokenKey,action) => {
    try {
        let response = await Axios.delete(`http://127.0.0.1:8000/api/v1/clothes/destroy_wash/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
            }
        })
        
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