"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from '../../../modules/storages/cookie'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { messageError } from '@/modules/helpers/message'

export default function CalendarSectionExportDailyData(props) {
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async (date) => {
        try {
            Swal.showLoading()
            date = new Date(date)
            date = date.toISOString().split('T')[0]

            const response = await Axios.get(`http://127.0.0.1:8000/api/v1/export/clothes/calendar/pdf/${date}`, {
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Authorization': `Bearer ${tokenKey}`,
                },
                responseType: 'blob'
            })
            Swal.close()

            if(response.status === 200){
                const fileName = `calendar-daily-${date}.pdf`

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()

                Swal.fire({
                    title: "Success!",
                    text: `Calendar daily report downloaded`,
                    icon: "success",
                    confirmButtonText: "Okay!"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Calendar daily report failed to download`,
                    confirmButtonText: "Okay!"
                })
            }
        } catch (error) {
            messageError(error)
        }
    }

    return <button className="btn btn-primary btn-print w-100" onClick={(e) => handleDownload(props.date)}><FontAwesomeIcon icon={faPrint}/></button>
}
  