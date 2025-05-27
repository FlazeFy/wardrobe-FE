import Swal from 'sweetalert2'
import Axios from 'axios'
import { messageError } from "../helpers/message"

export const postFeedback = async (feedbackRate, feedbackBody, tokenKey, setFeedbackBody, setFeedbackRate) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            feedback_rate : feedbackRate,
            feedback_body : feedbackBody,
        }

        // Validator
        if(body.feedback_body.trim().length > 0){
            if(body.feedback_rate > 0 && body.feedback_rate <= 5){
                // Exec
                const response = await Axios.post("http://127.0.0.1:8000/api/v1/feedback", JSON.stringify(body), {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${tokenKey}`,
                        'Content-Type' : 'application/json'
                    }
                })
                Swal.close()

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
                            setFeedbackBody("")
                            setFeedbackRate(0)
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
                    text: 'The feedback rate field is required',
                    confirmButtonText: "Okay!"
                })
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'The feedback body field is required',
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}