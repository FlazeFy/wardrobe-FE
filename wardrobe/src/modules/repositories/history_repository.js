import Swal from 'sweetalert2'
import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1/history"

export const getHistoryRepo = async (page, onSuccess, onError) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}?page=${page}`)
        onSuccess(response.data.data)
    } catch (error) {
        if (error.response && error.response.status === 404) {
            onSuccess(null)
            return
        }
    
        onError(error)
        onError(error)
    }    
}

export const deleteHistoryRepo = async (id, action, onError) => {
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
        }
    } catch (error) {
        onError(error)
    }
}