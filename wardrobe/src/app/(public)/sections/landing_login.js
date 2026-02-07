"use client"
import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from "react"
import MoleculesField from '../../../components/molecules/molecules_field'
import AtomsBreakLine from '../../../components/atoms/atoms_breakline'
import { useRouter } from 'next/navigation'
import { postLogin } from '@/modules/repositories/auth_repository'
import Link from "next/link"

export default function LandingSectionLogin(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    // Repositories
    const handleSubmit = async (e) => {
        postLogin(username,password,router)
    }

    return (
        <div className='row' id={`${props.ctx}-section`}>
            <div className='d-none d-lg-block col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center'>
                <img src={"/logo_full.png"} className="img img-fluid img-rounded mx-auto" style={{height:"500px",width:"500px"}}/>
            </div>
            <div className='col-lg-6 col-md-12'>
                <div className='container-fluid custom-container'>
                    <h4 className="mb-3 text-title" style={{fontWeight:"800"}}><span className='text-main'>Hello</span> There!!!</h4>
                    <h5 className="mb-4">Do you have an account? type your username and password to proceed sign in, so you can using this apps</h5>
                    <MoleculesField title="Username" type={'text'} id="username-input" defaultValue={username} handleChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                    <MoleculesField title="Password" type={'password'} id="password-input" defaultValue={password} handleChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    <AtomsBreakLine length={1}/>
                    <button type="button" className="btn btn-success me-2" id="submit-login-button" onClick={handleSubmit}><FontAwesomeIcon icon={faSignIn}/> Sign In</button>
                    <Link href="/register">
                        <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faArrowRight}/> New User?<span className='d-none d-lg-inline-block'> Join Now</span></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
