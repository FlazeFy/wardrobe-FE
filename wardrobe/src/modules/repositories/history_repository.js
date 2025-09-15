import Swal from 'sweetalert2'
import { messageError } from '@/modules/helpers/message'
import Axios from 'axios'

export async function fetchHistory(page, onSuccess, onError, tokenKey){
    try {
        fetch(`http://127.0.0.1:8000/api/v1/history?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}` 
            }
        })
        .then(res => {
            if (res.status === 404) {
                onSuccess(null)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) {
                onSuccess(result.data)
            }
            Swal.close()
        })
    } catch (error) {
        messageError(error)
        onError(error)
    }
}

export async function hardDeleteHistory(id,action,tokenKey){
    try {
        let response = await Axios.delete(`http://127.0.0.1:8000/api/v1/history/destroy/${id}`, {
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
                confirmButtonText: "Okay!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    action()
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}