"use client"
import { faArrowRight, faSignIn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react"
import MoleculesField from '../../../components/molecules/molecules_field'
import AtomsBreakLine from '../../../components/atoms/atoms_breakline'
import { useRouter } from 'next/navigation'
import { postLoginRepo } from '@/modules/repositories/auth_repository'
import Link from "next/link"
import { useForm } from "react-hook-form" 
import { yupResolver } from "@hookform/resolvers/yup" 
import { loginSchema } from '@/modules/validators/auth_validator'

export default function LandingSectionLogin(props) {
    // State management
    const router = useRouter()
    
    // Form validator
    const form = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { username: "", password: "" }
    })

    // Repositories
    const onSubmit = async (val) => await postLoginRepo(val.username,val.password,router)

    return (
        <div className='row' id={`${props.ctx}-section`}>
            <div className='d-none d-lg-block col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center'>
                <img src={"/logo_full.png"} className="img img-fluid img-rounded mx-auto" style={{height:"500px",width:"500px"}}/>
            </div>
            <div className='col-lg-6 col-md-12'>
                <div className='container-fluid custom-container'>
                    <h4 className="mb-3 text-title" style={{fontWeight:"800"}}><span className='text-main'>Hello</span> There!!!</h4>
                    <h5 className="mb-4">Do you have an account? type your username and password to proceed sign in, so you can using this apps</h5>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <MoleculesField title="Username" type={'text'} id="username-input" defaultValue={form.watch("username")} handleChange={(e) => form.setValue("username", e.target.value)}/>
                        { form.formState.errors.username && <p className="text-danger">{form.formState.errors.username.message}</p> }
                        <MoleculesField title="Password" type={'password'} id="password-input" defaultValue={form.watch("password")} handleChange={(e) => form.setValue("password", e.target.value)}/>
                        { form.formState.errors.password && <p className="text-danger">{form.formState.errors.password.message}</p> }
                        <AtomsBreakLine length={1}/>
                        <button type="submit" className="btn btn-success me-2" id="submit-login-button" disabled={form.formState.isSubmitting}>
                            <FontAwesomeIcon icon={faSignIn}/> {form.formState.isSubmitting ? " Checking..." : " Sign In"}
                        </button>
                        <Link href="/register">
                            <button type="button" className="btn btn-primary"><FontAwesomeIcon icon={faArrowRight}/> New User?<span className='d-none d-lg-inline-block'> Join Now</span></button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}