"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from '../../../../../modules/storages/cookie'

export default function ClothesDetailSectionExportData(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async (id) => {
        try {
            Swal.showLoading()
            const response = await Axios.get(`http://127.0.0.1:8000/api/v1/export/clothes/detail/pdf/${id}`, {
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Authorization': `Bearer ${tokenKey}`,
                },
                responseType: 'blob'
            })
            Swal.close()

            if(response.status === 200){
                const fileName = `clothes-detail-${id}.pdf`

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()

                Swal.fire({
                    title: "Success!",
                    text: `Clothes detail downloaded`,
                    icon: "success",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Clothes detail failed to download`,
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
        <div className="field">
            <label>Export Data</label><br></br>
            <a className='btn btn-success' onClick={(e) => handleDownload(props.id)}><FontAwesomeIcon icon={faDownload}/> Download PDF</a>
        </div>
    );
}
  