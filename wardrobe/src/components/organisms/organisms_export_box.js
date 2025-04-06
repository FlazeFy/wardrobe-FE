"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from '../../modules/storages/cookie'
import { getCleanTitleFromCtx } from '../../modules/helpers/converter'

export default function OrganismsExportBox(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleDownload = async (ctx, type) => {
        try {
            Swal.showLoading()
            const response = await Axios.get(`http://127.0.0.1:8000/api/v1/export/${ctx}/${type}`, {
                headers: {
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Authorization': `Bearer ${tokenKey}`,
                },
                responseType: 'blob'
            })
            Swal.close()

            if(response.status === 200){
                const contentDisposition = response.headers['content-disposition']
                const fileName = contentDisposition && contentDisposition.match(/filename="(.+)"/) ? contentDisposition.match(/filename="(.+)"/)[1] : `${ctx}_data.${type == 'excel' ? 'xlsx' : 'pdf'}`

                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.remove()

                Swal.fire({
                    title: "Success!",
                    text: `${getCleanTitleFromCtx(ctx)} data downloaded`,
                    icon: "success",
                    confirmButtonText: "Okay!"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${getCleanTitleFromCtx(ctx)} data failed to download`,
                    confirmButtonText: "Okay!"
                })
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonText: "Okay!"
            })
        }
    }

    return (
        <div className='container-bordered'>
            <h5 className='mb-0'>{props.title}</h5>
            <p className='text-secondary'>{props.desc}</p>
            <a className='btn btn-success' style={{textTransform:"capitalize"}} onClick={(e) => handleDownload(props.ctx,props.type)}><FontAwesomeIcon icon={faDownload}/> Download {props.type}</a>
        </div>
    )
}
  