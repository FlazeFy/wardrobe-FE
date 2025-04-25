"use client"
import { faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Swal from 'sweetalert2'
import MoleculesField from '../../../components/molecules/molecules_field'
import Axios from 'axios'
import { getErrorValidation } from '../../../modules/helpers/converter'
import { storeLocal } from '../../../modules/storages/local'

export default function RegisterSectionForm(props) {
    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "username" : props.username,
                "password" : props.password,
                "email" : props.email,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/register", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
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
                        props.setIsDisabled(true)
                        props.setIsRegistered(true)
                        props.setShowFormToken(true)
                        props.setStartValidationTimer(true)
                        storeLocal("username_key",response.data.result.username)
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
            <h1 className="mb-0 fw-bold">Getting Started</h1>
            <h4 className="text-secondary">Let&apos;s Create Your Account Here!</h4>
            <MoleculesField title="Email" isDisabled={props.isDisabled} type={'text'} defaultValue={props.email} handleChange={(e) => {
                props.setEmail(e.target.value)
            }}/>
            <MoleculesField title="Username" isDisabled={props.isDisabled} type={'text'} defaultValue={props.username} handleChange={(e) => {
                props.setUsername(e.target.value)
            }}/>
            <MoleculesField title="Password" isDisabled={props.isDisabled} type={'password'} defaultValue={props.password} handleChange={(e) => {
                props.setPassword(e.target.value)
            }}/>
            {
                props.isRegistered == false ? <button className='btn btn-success mt-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Submit New Account</button> : <div className='text-success'><FontAwesomeIcon icon={faCheck}/> Account is Registered!</div>
            }
        </div>
    )
}
  