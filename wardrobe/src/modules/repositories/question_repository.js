import Swal from 'sweetalert2'
import Axios from 'axios'
import { messageError } from "../helpers/message"

export const postQuestion = async (question,tokenKey,setQuestion) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "question" : question,
        }

        // Validator
        if(body.question.trim().length > 0){
            // Exec
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/question", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`,
                    'Content-Type' : 'application/json'
                }
            })

            // Response
            if(response.status === 201){
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    allowOutsideClick: false,
                    confirmButtonText: "Okay!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        setQuestion("")
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                    confirmButtonText: "Okay!"
                })
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'The question field is required.',
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}