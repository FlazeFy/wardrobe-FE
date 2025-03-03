"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import MoleculesField from '../../../components/molecules/molecules_field'
import Axios from 'axios'

export default function RegisterSectionForm(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "username" : username,
                "password" : password,
                "email" : email,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/user/regist", JSON.stringify(body), {
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
                       //
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
            <h1 className="mb-0 fw-bold">Getting Started</h1>
            <h4 className="text-secondary">Let's Create Your Account Here!</h4>
            <MoleculesField title="Email" type={'text'} defaultValue={email} handleChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <MoleculesField title="Username" type={'text'} defaultValue={username} handleChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <MoleculesField title="Password" type={'password'} defaultValue={password} handleChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <button className='btn btn-success mt-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Submit New Account</button>
        </div>
    )
}
  