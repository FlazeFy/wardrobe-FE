"use client"
import { faCheck, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import MoleculesField from '../../../../components/molecules/molecules_field'
import { postRegisterRepo } from '@/modules/repositories/auth_repository'

export default function RegisterSectionForm(props) {
    // Services
    const handleSubmit = async (e) => {
        postRegisterRepo(props)
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
  