"use client"
import MoleculesField from '../../../../components/molecules/molecules_field'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { getLocal } from '../../../../modules/storages/local'
import { postQuestion } from '@/modules/repositories/question_repository'

export default function ProfileSectionSendQuestion(props) {
    const [question, setQuestion] = useState("")
    const tokenKey = getLocal("token_key")

    // Repositories
    const handleSubmit = async (e) => {
        postQuestion(question,tokenKey,setQuestion)
    }

    return (
        <div id="question-section"> 
            <h2 className="fw-bold">Ask A Question</h2>
            <MoleculesField title="If you confused about how our apps work, or just want to make sure. Feel free to ask!" type={'textarea'} defaultValue={question} id='question-input' handleChange={(e) => {
                setQuestion(e.target.value)
            }}/>
            <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faPaperPlane}/> Send Question</button>
        </div>
    )
}
  