"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getCookie } from '../../../modules/storages/cookie'
import { fetchExportCalendar } from '@/modules/repositories/export_repository'

export default function CalendarSectionExportData(props) {
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async () => {
        fetchExportCalendar('excel',props.year,`calendar-${props.year}.xlsx`, 'data', tokenKey)
    }

    return (
        <div className="field ms-3">
            <label>Export Data</label><br></br>
            <a className='btn btn-success' onClick={(e) => handleDownload()}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
        </div>
    );
}
  