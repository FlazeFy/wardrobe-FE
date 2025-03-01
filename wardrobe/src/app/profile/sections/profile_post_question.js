"use client"
import MoleculesField from '../../../components/molecules/molecules_field'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function ProfileSectionSendQuestion(props) {
    const [question, setQuestion] = useState("")
    const [msgAll, setResMsgAll] = useState(null)

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "question" : question,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/question/ask", JSON.stringify(body), {
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
                       setQuestion("")
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
        <div> 
            <h2 className="fw-bold">Ask A Question</h2>
            <MoleculesField title="If you confused about how our apps work, or just want to make sure. Feel free to ask!" type={'textarea'} defaultValue={question} handleChange={(e) => {
                setQuestion(e.target.value)
            }}/>
            <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane}/> Send Question</button>
        </div>
    )
}
  