"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import MoleculesField from '../../../../components/molecules/molecules_field'
import { postFeedback } from '@/modules/repositories/feedback_repository'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { feedbackSchema } from '@/modules/validators/feedback_validator'

export default function FeedbackSectionSend() {
    // Form validator
    const form = useForm({
        resolver: yupResolver(feedbackSchema), 
        defaultValues: { feedback_rate: 0, feedback_body: "" }
    })

    // Repositories
    const onSubmit = async (val) => {
        await postFeedback(val.feedback_rate, val.feedback_body)
        form.reset()
    }

    return (
        <div className="mx-4" id="send_feedback-section">
            <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Give Us <span className="text-main">Feedback</span></h1>
            <h5 className="mb-4">Wardrobe is still at development, so your feedback will be very helpfull for us to improve.</h5>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <MoleculesField title="What do you think about our apps?" type={'textarea'} defaultValue={form.watch("feedback_body")} id='feedback_body-input' handleChange={(e) => form.setValue("feedback_body", e.target.value)}/>
                { form.formState.errors.feedback_body && <p className="text-error">{form.formState.errors.feedback_body.message}</p> }
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <MoleculesField title="Rate us from 1 - 5" type={'rating'} id='feedback_rate-input' defaultValue={form.watch("feedback_rate")} handleChange={(e) => form.setValue("feedback_rate", e)}/>
                        { form.formState.errors.feedback_rate && <p className="text-error">{form.formState.errors.feedback_rate.message}</p> }
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 text-end pt-2'>
                        <button type="submit" className="btn btn-success"><FontAwesomeIcon icon={faFloppyDisk}/> Send Feedback</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
