"use client"
import { storeCookie } from '../../modules/storages/cookie'
import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState } from "react"
import Swal from 'sweetalert2'
import MoleculesField from '../../components/molecules/molecules_field'
import AtomsBreakLine from '../../components/atoms/atoms_breakline'
import { getErrorValidation } from '../../modules/helpers/converter'

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
                    confirmButtonText: "Okay!"
                }).then((result) => {
                    if (result.isConfirmed) {
                       window.location.href = '/clothes'
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.result,
                    confirmButtonText: "Okay!"
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
                    confirmButtonText: "Okay!"
                })
                setResMsgAll(error)
            } else if(error.response.status === 422){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: getErrorValidation(error.response.data.result),
                    confirmButtonText: "Okay!"
                })
                setResMsgAll(error)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setResMsgAll(error)
            }
        }
    }

    return (
        <div className="mx-4" id={`${props.ctx}-section`}>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center'>
                    <img src={"/logo_full.png"} className="img img-fluid img-rounded mx-auto" style={{height:"500px",width:"500px"}}/>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='container-fluid custom-container'>
                        <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}><span className='text-main'>Hello</span> There!!!</h1>
                        <h5 className="mb-4">Do you have an account? type your username and password to proceed sign in, so you can using this apps</h5>
                        <MoleculesField title="Username" type={'text'} id="username-input" handleChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                        <MoleculesField title="Password" type={'text'} id="password-input" handleChange={(e) => {
                            setPassword(e.target.value)
                        }}/>
                        <AtomsBreakLine length={1}/>
                        <button type="button" className="btn btn-success me-2" id="submit-login-button" onClick={handleSubmit}><FontAwesomeIcon icon={faSignIn}/> Sign In</button>
                        <a type="button" className="btn btn-primary" href="/register"><FontAwesomeIcon icon={faArrowRight}/> New User? Join Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
