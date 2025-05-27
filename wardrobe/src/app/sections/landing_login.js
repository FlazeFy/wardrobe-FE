"use client"
import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from "react"
import MoleculesField from '../../components/molecules/molecules_field'
import AtomsBreakLine from '../../components/atoms/atoms_breakline'
import { getLocal } from '../../modules/storages/local'
import { useRouter } from 'next/navigation'
import { postLogin } from '@/modules/repositories/auth_repository'

export default function LandingSectionLogin(props) {
    const usernameLocal = getLocal('username_key')
    const [username, setUsername] = useState(usernameLocal ?? "")
    const [password, setPassword] = useState("")
    const router = useRouter()

    // Repositories
    const handleSubmit = async (e) => {
        postLogin(username,password,router)
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
                        <MoleculesField title="Username" type={'text'} id="username-input" defaultValue={username} handleChange={(e) => {
                            setUsername(e.target.value)
                        }}/>
                        <MoleculesField title="Password" type={'text'} id="password-input" defaultValue={password} handleChange={(e) => {
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
