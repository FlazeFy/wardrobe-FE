"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getCookie } from '../../../modules/storages/cookie'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { fetchExportCalendar } from '@/modules/repositories/export_repository'

export default function CalendarSectionExportDailyData(props) {
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async (date) => {
        fetchExportCalendar('pdf',date,`calendar-daily-${date}.pdf`, 'daily report', tokenKey)
    }

    return <button className="btn btn-primary btn-print w-100" onClick={(e) => handleDownload(props.date)}><FontAwesomeIcon icon={faPrint}/></button>
}
  