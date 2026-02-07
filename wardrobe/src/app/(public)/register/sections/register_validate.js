"use client"
import React, { useEffect, useState } from 'react'
import PinInput from 'react-pin-input'
import { useRouter } from 'next/navigation'
import { postValidateRegister } from '@/modules/repositories/auth_repository'

export default function RegisterSectionValidate(props) {
    const [token, setToken] = useState("")
    const [countdown, setCountdown] = useState(20 * 60)
    const router = useRouter()

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
        postValidateRegister(token,router)
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
  