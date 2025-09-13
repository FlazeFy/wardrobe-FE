import { getLocal } from "../storages/local"
import Axios from 'axios'
import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

export const postSaveOutfit = async (token) => {
    try {
        Swal.showLoading()

        // Payload
        const data = JSON.parse(getLocal('generated_outfit_history'))
        const body = {
            'list_outfit' : data
        }

        // Exec
        let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/save`, JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        Swal.hideLoading()
        
        // Response
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
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const postSaveOutfitHistory = async (id,tokenKey,props) => {
    try {
        // Payload
        const data = {
            outfit_id : id,
            used_context: 'Work'
        }

        // Exec
        let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/save`, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
            }
        })
        
        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    props.fetchOutfit()
                    props.fetchAllHistory()
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}