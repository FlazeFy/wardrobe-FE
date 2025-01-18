import React from 'react'
import { useState, useEffect } from "react"
import { getLocal } from '../../../../../../modules/storages/local'
import PostWash from './post_wash'
import PutWashFinished from './put_wash_finished'
import { getCookie } from '../../../../../../modules/storages/cookie'

export default function GetClothesWashedStatus({ctx,id,clothesName}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/check_wash/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenKey}`
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
                <div className='mt-1'>
                {
                    status == false ?
                        <PostWash key={id+"_post_wash"} ctx="post_wash" clothesName={clothesName} clothesId={id}/> 
                    :
                        <PutWashFinished key={id+"_put_wash"} ctx="put_wash" clothesId={id}/>
                }
                </div>
            </div>
        )
    }
}
  