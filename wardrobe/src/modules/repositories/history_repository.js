import Swal from 'sweetalert2'
import { messageError } from '@/modules/helpers/message'
import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1/history"

export const fetchHistory = async (page, onSuccess, onError) => {
    try {
        fetch(`${MODULE_URL}?page=${page}`)
        .then(res => {
            if (res.status === 404) {
                onSuccess(null)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) onSuccess(result.data)
            Swal.close()
        })
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export const hardDeleteHistory = async (id,action) => {
    try {
        let response = await apiCall.delete(`${MODULE_URL}/destroy/${id}`)
        
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                confirmButtonText: "Okay!",
                icon: "success"
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