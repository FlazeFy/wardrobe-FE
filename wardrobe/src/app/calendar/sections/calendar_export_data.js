"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from '../../../modules/storages/cookie'

export default function CalendarSectionExportData() {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async () => {
        try {
            Swal.showLoading()
            const response = await Axios.get(`http://127.0.0.1:8000/api/v1/export/clothes/calendar/excel/2025`, {
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Authorization': `Bearer ${tokenKey}`,
                },
                responseType: 'blob'
            })
            Swal.close()

            if(response.status === 200){
                const fileName = `calendar_data.xlsx`

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()

                Swal.fire({
                    title: "Success!",
                    text: `Calendar data downloaded`,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Calendar data failed to download`,
                })
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
            })
        }
    }

    return (
        <div className="field ms-3">
            <label>Export Data</label><br></br>
            <a className='btn btn-success' onClick={(e) => handleDownload()}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
        </div>
    );
}
  