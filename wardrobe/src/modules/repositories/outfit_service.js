import { getLocal } from "../storages/local"
import Axios from 'axios'
import Swal from "sweetalert2"
import { getErrorValidation } from "@/modules/helpers/converter"

export const postSaveOutfit = async (token) => {
    try {
        const data = JSON.parse(getLocal('generated_outfit_history'))
        const body = {
            'list_outfit' : data
        }

        let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/save`, JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        
        Swal.hideLoading()
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('generated_outfit_history')
                }
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        Swal.close()
        const msg = getErrorValidation(error.response.data.message)
        
        if (error.response && (error.response.status === 422 || error.response.status === 409)) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: msg,
                confirmButtonText: "Okay!"
            });

            setResMsgAll(msg)
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Okay!"
            });

            setResMsgAll(error);
        }
    }
}