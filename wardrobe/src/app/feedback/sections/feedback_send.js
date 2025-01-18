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

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "feedback_rate" : feedbackRate,
                "feedback_body" : feedbackBody,
            }

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
                })
                setResMsgAll(response.data.message)
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            setResMsgAll(error)
        }
    }

    return (
        <div className="mx-4">
            <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Give Us Feedback</h1>
            <h5 className="mb-4 text-secondary">Wardrobe is still at development, so your feedback will be very helpfull for us to improve.</h5>
            <MoleculesField title="What do you think about our apps?" type={'textarea'} defaultValue={feedbackBody} handleChange={(e) => {
                setFeedbackBody(e.target.value)
            }}/>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesField title="Rate us from 1 - 5" type={'rating'} handleChange={(e) => {
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
