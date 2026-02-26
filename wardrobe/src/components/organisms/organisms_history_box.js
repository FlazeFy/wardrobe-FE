"use client"
import ProfileSectiondeleteHistoryRepo from '../../app/(protected)/profile/sections/profile_hard_delete_history'
import React from 'react'
import { convertDatetimeBasedLocal } from '../../modules/helpers/converter'

export default function OrganismsHistoryBox(props) {
    return (
        <div className="history-box mb-3">
            <div className='d-flex justify-content-between'>
                <div>
                    <h6 className='mb-0'>{props.items.history_type} {props.items.history_context}</h6>
                    <p className='mb-0 text-secondary'>At {convertDatetimeBasedLocal(props.items.created_at)}</p>
                </div>
                <ProfileSectiondeleteHistoryRepo id={props.items.id} getHistoryRepo={props.getHistoryRepo}/>
            </div>
        </div>
    )
}
  