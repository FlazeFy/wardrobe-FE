"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getExportRepo } from '@/modules/repositories/export_repository'

export default function OrganismsExportBox(props) {
    const handleDownload = async (ctx, type) => {
        getExportRepo(ctx, type)
    }

    return (
        <div className='container-bordered' id={props.id}>
            <h5 className='mb-0'>{props.title}</h5>
            <p className='text-secondary'>{props.desc}</p>
            <a className='btn btn-success' style={{textTransform:"capitalize"}} onClick={(e) => handleDownload(props.ctx,props.type)}><FontAwesomeIcon icon={faDownload}/> Download {props.type}</a>
        </div>
    )
}
  