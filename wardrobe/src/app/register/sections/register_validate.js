"use client"

import React, { useState } from 'react'
import PinInput from 'react-pin-input'
import Swal from 'sweetalert2'
import Axios from 'axios'

export default function RegisterSectionValidate(props) {
    const [token, setToken] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "token" : token,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/user/regist/validate", JSON.stringify(body), {
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
                       //
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
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Okay!"
            })
            setResMsgAll(error)
        }
    }

    return (
        <div>
            <h1 className="mb-0 fw-bold">Account Validation</h1>
            <h4 className="text-secondary">We Have Sended You The Validation Token For Your Account Registration. 
            Please Type It, And We Will Validate Your Account</h4>
            <div className='text-center mt-4'>
                <PinInput length={6} initialValue="" secret secretDelay={100} onChange={(value, index) => {}} type="numeric" inputMode="number"
                    inputStyle={{borderColor: 'grey'}} inputFocusStyle={{borderColor: 'black'}} onComplete={(value, index) => {}}
                    autoSelect={true} regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
            </div>
        </div>
    )
}
  