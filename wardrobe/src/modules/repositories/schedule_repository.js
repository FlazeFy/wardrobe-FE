import Swal from "sweetalert2"
import apiCall from '@/configs/axios'

export const deleteScheduleById = async (id, action, onError) => {
    try {
        let response = await apiCall.delete(`http://127.0.0.1:8000/api/v1/clothes/destroy_schedule/${id}`)
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) action()
            })
        } 
    } catch (error) {
        onError(error)
    }
} 