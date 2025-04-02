"use client"
import { convertDatetimeBasedLocal } from '../../../modules/helpers/converter'
import React from 'react'

export default function ProfileSectionPropsProfile(props) {
    return (
        <div className='d-block mx-auto' style={{width:"700px"}} id="props_profile-section"> 
            <div className='d-flex justify-content-end align-items-end'>
                <div className='me-2 text-end'>
                    <h4 className="mb-0">{convertDatetimeBasedLocal(props.created_at)}</h4>
                </div>
                <div>
                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Joined Since</h1>
                </div>
            </div>
            <div className='d-flex justify-content-end align-items-start'>
                <div className='me-2'>
                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Last Updated</h1>
                </div>
                <div className='text-start'>
                    <h4 className="mb-0">{props.updated_at ? convertDatetimeBasedLocal(props.updated_at) : '-'}</h4>
                </div>
            </div>
        </div>
    )
}