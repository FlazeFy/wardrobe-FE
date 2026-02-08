import Swal from 'sweetalert2'
import apiCall from '@/configs/axios'
import { getLocal, storeLocal } from '../../modules/storages/local.js'

const MODULE_URL = "/api/v1/feedback"

export const postFeedback = async (feedbackRate, feedbackBody, setFeedbackBody, setFeedbackRate, onError) => {
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
                const response = await apiCall.post(`${MODULE_URL}`, body)
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
                    })
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
        onError(error)
    }
}

export const fetchFeedback = async (now, onSuccess, onError) => {
    try {
        const oldTimeHit = getLocal("last_hit-feedback_stats")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null
    
        const fetchData = (data) => {
            onSuccess(data)
        }
    
        if (timeDiffInSec !== null && timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("feedback_stats_temp"))
            fetchData(oldData)
            return
        }
    
        const response = await apiCall.get(`http://127.0.0.1:8000/api/v1/stats/feedback/top`)
    
        fetchData(response.data)
        storeLocal("feedback_stats_temp", JSON.stringify(response.data.data))
        storeLocal("last_hit-feedback_stats_temp", JSON.stringify(now))
    } catch (error) {
        onError(error)
    }    
}