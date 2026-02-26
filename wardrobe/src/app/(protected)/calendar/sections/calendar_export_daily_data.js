"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { getExportRepoCalendarRepo } from '@/modules/repositories/export_repository'

export default function CalendarSectionExportDailyData(props) {
    // Services
    const handleDownload = async (date) => getExportRepoCalendarRepo('pdf',date,`calendar-daily-${date}.pdf`, 'daily report')

    return <button className="btn btn-primary btn-print w-100" onClick={(e) => handleDownload(props.date)}><FontAwesomeIcon icon={faPrint}/></button>
}
  