"use client"
import { getCookie } from '../../../modules/storages/cookie'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState } from "react"
import Swal from 'sweetalert2'
import MoleculesField from '../../../components/molecules/molecules_field'

export default function FeedbackSectionSend() {
    const [feedbackRate, setFeedbackRate] = useState(0)
    const [feedbackBody, setFeedbackBody] = useState("")
    const tokenKey = getCookie("token_key")
    const [msgAll, setResMsgAll] = useState(null)

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                feedback_rate : feedbackRate,
                feedback_body : feedbackBody,
            }
            if(body.feedback_body.trim().length > 0){
                if(body.feedback_rate > 0 && body.feedback_rate <= 5){
                    Swal.showLoading()
                    const response = await Axios.post("http://127.0.0.1:8000/api/v1/feedback", JSON.stringify(body), {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${tokenKey}`,
                            'Content-Type' : 'application/json'
                        }
                    })
                    Swal.close()

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
                        setResMsgAll(response.data.message)
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
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonText: "Okay!"
            })
            setResMsgAll(error)
        }
    }

    return (
        <div className="mx-4" id="send_feedback-section">
            <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Give Us <span className="text-main">Feedback</span></h1>
            <h5 className="mb-4">Wardrobe is still at development, so your feedback will be very helpfull for us to improve.</h5>
            <MoleculesField title="What do you think about our apps?" type={'textarea'} defaultValue={feedbackBody} id='feedback_body-input' handleChange={(e) => {
                setFeedbackBody(e.target.value)
            }}/>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesField title="Rate us from 1 - 5" type={'rating'} id='feedback_rate-input' handleChange={(e) => {
                        setFeedbackRate(e)
                    }}/>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 text-end pt-2'>
                    <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Send Feedback</button>
                </div>
            </div>
        </div>
    );
}
