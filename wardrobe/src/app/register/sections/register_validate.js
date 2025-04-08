"use client"
import React, { useEffect, useState } from 'react'
import PinInput from 'react-pin-input'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { getLocal, storeLocal } from '../../../modules/storages/local'
import { getErrorValidation } from '../../../modules/helpers/converter'

export default function RegisterSectionValidate(props) {
    const [token, setToken] = useState("")
    const [countdown, setCountdown] = useState(20 * 60)

    useEffect(() => {
        if (!props.startValidationTimer) return

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [props.startValidationTimer])

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0')
        const sec = (seconds % 60).toString().padStart(2, '0')
        return `${min}:${sec}`
    }

    // Services
    const handleSubmit = async (e, token) => {
        try {
            const username = getLocal("username_key")
            const body = {
                "token" : token,
                "username" : username
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/register/validate", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            Swal.close()

            if(response.status === 200){
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    allowOutsideClick: false,
                    confirmButtonText: "Okay!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        storeLocal("is_new_user",true)
                        window.location.href = '/'
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
            }
        } catch (error) {
            Swal.close()
            const status = error?.response?.status
            const message = error?.response?.data?.result || "Something went wrong!"

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: status == 500 ? "Something went wrong!" : getErrorValidation(message),
                confirmButtonText: "Okay!"
            })
        }
    }

    return (
        <div>
            <h1 className="mb-0 fw-bold">Account Validation</h1>
            <h4 className="text-secondary">We Have Sended You The Validation Token For Your Account Registration. 
            Please Type It, And We Will Validate Your Account</h4>
            {
                props.startValidationTimer && (
                    <div className="text-danger text-center my-2">
                        <h2 style={{fontWeight:"700"}}>{formatTime(countdown)}</h2>
                    </div>
                )
            }
            <div className='text-center mt-4'>
                <PinInput length={6} initialValue="" secret secretDelay={100} onChange={(value, index) => {}} type="text" inputMode="number"
                    inputStyle={{borderColor: 'grey'}} inputFocusStyle={{borderColor: 'black'}} autoSelect={true} regexCriteria={/^[A-Za-z0-9]*$/}
                    onComplete={(value) => {
                        setToken(value)
                        handleSubmit(value, value)
                    }}
                />
            </div>
        </div>
    )
}
  