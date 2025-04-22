"use client"
import MoleculesField from '../../../components/molecules/molecules_field'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { getCookie } from '../../../modules/storages/cookie'
import { getErrorValidation } from '../../../modules/helpers/converter'

export default function ProfileSectionSendQuestion(props) {
    const [question, setQuestion] = useState("")
    const [msgAll, setResMsgAll] = useState(null)
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "question" : question,
            }

            if(body.question.trim().length > 0){
                Swal.showLoading()
                const response = await Axios.post("http://127.0.0.1:8000/api/v1/question", JSON.stringify(body), {
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
                    setResMsgAll(response.data.message)
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
            Swal.close()
            if (error.response && error.response.status === 422) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: getErrorValidation(error.response.data.message),
                    confirmButtonText: "Okay!"
                })
                setResMsgAll(error)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error,
                    confirmButtonText: "Okay!"
                })
                setResMsgAll(error)
            }
        }
    }

    return (
        <div> 
            <h2 className="fw-bold">Ask A Question</h2>
            <MoleculesField title="If you confused about how our apps work, or just want to make sure. Feel free to ask!" type={'textarea'} defaultValue={question} id='question-input' handleChange={(e) => {
                setQuestion(e.target.value)
            }}/>
            <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane}/> Send Question</button>
        </div>
    )
}
  