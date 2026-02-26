"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getExportRepoClothesDetailRepo } from '@/modules/repositories/export_repository'

export default function ClothesDetailSectionExportData(props) {
    // Services
    const handleDownload = async (id) => getExportRepoClothesDetailRepo(id)

    return (
        <div className="field">
            <label>Export Data</label><br></br>
            <a className='btn btn-success' onClick={(e) => handleDownload(props.id)}><FontAwesomeIcon icon={faDownload}/> Download PDF</a>
        </div>
    )
}
  