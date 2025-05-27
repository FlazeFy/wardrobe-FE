"use client"
import { getCookie } from '../../../modules/storages/cookie'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from "react"
import MoleculesField from '../../../components/molecules/molecules_field'
import { postFeedback } from '@/modules/repositories/feedback_repository'

export default function FeedbackSectionSend() {
    const [feedbackRate, setFeedbackRate] = useState(0)
    const [feedbackBody, setFeedbackBody] = useState("")
    const tokenKey = getCookie("token_key")

    // Repositories
    const handleSubmit = async (e) => {
        postFeedback(feedbackRate, feedbackBody, tokenKey, setFeedbackBody, setFeedbackRate)
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
