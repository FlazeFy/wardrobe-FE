import Swal from "sweetalert2"
import apiCall from '@/configs/axios'
import { messageError } from "../helpers/message"

export const deleteScheduleById = async (id, action) => {
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
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
} 