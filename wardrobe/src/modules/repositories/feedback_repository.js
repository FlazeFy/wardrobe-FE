import Swal from 'sweetalert2'
import Axios from 'axios'
import { messageError } from "../helpers/message"
import { getLocal, storeLocal } from '../../modules/storages/local.js'

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
                const response = await Axios.post("http://127.0.0.1:8000/api/v1/feedback", body, {
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

export async function fetchFeedback(now, onSuccess, onError) {
    try {
        const oldTimeHit = getLocal("last_hit-feedback_stats")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null

        const fetchData = (data) => {
            Swal.close()
            onSuccess(data)
        }

        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("feedback_stats_temp"))
            fetchData(oldData)
            return
        }

        const response = await fetch(`http://127.0.0.1:8000/api/v1/stats/feedback/top`)
        const result = await response.json()

        if (response.ok) {
            fetchData(result)
            storeLocal("feedback_stats_temp", JSON.stringify(result.data))
            storeLocal("last_hit-feedback_stats_temp", JSON.stringify(now))
        } else {
            throw new Error(result.message || "Failed to fetch data")
        }
    } catch (error) {
        messageError(error)
        onError(error)
    }
}