import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getLocal, storeLocal } from '@/modules/storages/local'

// Modules


export default function GetClothesWashedStatus({ctx,id}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const keyToken = '76|HkWAJH66qssjePsFpldCJEg4pXTGE7tifRTClkkK92bcec9f'

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/check_wash/${id}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setStatus(result.data)
                setMessage(result.message)    
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className={`mt-3 alert alert-${status == true ? 'danger' : 'success'}`} role="alert">
                {message}
            </div>
        )
    }
}
  