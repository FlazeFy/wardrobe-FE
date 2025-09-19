"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getCookie } from '../../../../../modules/storages/cookie'
import { fetchExportClothesDetail } from '@/modules/repositories/export_repository'

export default function ClothesDetailSectionExportData(props) {
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async (id) => {
        fetchExportClothesDetail(id, tokenKey)
    }

    return (
        <div className="field">
            <label>Export Data</label><br></br>
            <a className='btn btn-success' onClick={(e) => handleDownload(props.id)}><FontAwesomeIcon icon={faDownload}/> Download PDF</a>
        </div>
    );
}
  