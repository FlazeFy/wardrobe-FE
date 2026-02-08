import Swal from 'sweetalert2'
import { messageError } from '@/modules/helpers/message'
import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1/history"

export const fetchHistory = async (page, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}?page=${page}`)
        onSuccess(response.data.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onSuccess(null)
            return
        }
    
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