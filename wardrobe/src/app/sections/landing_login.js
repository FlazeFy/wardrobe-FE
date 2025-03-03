"use client"
import { storeCookie } from '../../modules/storages/cookie'
import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState } from "react"
import Swal from 'sweetalert2'
import MoleculesField from '../../components/molecules/molecules_field'

export default function LandingSectionLogin(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msgAll, setResMsgAll] = useState(null)

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "username" : username,
                "password" : password,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/login", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
            })
            Swal.close()

            if(response.status === 200){
                const username = response.data.result.username
                storeCookie('token_key',response.data.token)
                storeCookie('username_key',username)

                Swal.fire({
                    title: "Success!",
                    text: `Welcome, ${username}`,
                    icon: "success",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                       window.location.href = '/'
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.result,
                })
                setResMsgAll(response.data.result)
            }
        } catch (error) {
            Swal.close()
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.result,
                })
                setResMsgAll(error)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setResMsgAll(error)
            }
        }
    }

    return (
        <div className="mx-4" id={`${props.ctx}-section`}>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 text-center'>
                    <img src={"/logo_full.png"} className="img img-fluid img-rounded"/>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Hello There!!!</h1>
                    <h5 className="mb-4 text-secondary">Do you have an account? type your username and password to proceed sign in, so you can using this apps</h5>
                    <MoleculesField title="Username" type={'text'} handleChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    <MoleculesField title="Password" type={'text'} handleChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    <button type="button" className="btn btn-success me-2" onClick={handleSubmit}><FontAwesomeIcon icon={faSignIn}/> Sign In</button>
                    <a type="button" className="btn btn-primary" href="/register"><FontAwesomeIcon icon={faArrowRight}/> New User? Join Now</a>
                </div>
            </div>
        </div>
    );
}
