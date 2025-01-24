"use client"
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { getCookie } from '../../../modules/storages/cookie'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

export default function ProfileSectionExportData() {
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
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${getCleanTitleFromCtx(ctx)} data failed to download`,
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
        <> 
            <h2 className="fw-bold">Export My Data</h2>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='container-bordered'>
                        <h5 className='mb-0'>Clothes Data</h5>
                        <p className='text-secondary'>All clothes data are separated into 2 section. The active clothes and the deleted clothes</p>
                        <a className='btn btn-success' onClick={(e) => handleDownload('clothes','excel')}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='container-bordered'>
                        <h5 className='mb-0'>Clothes Used History Data</h5>
                        <p className='text-secondary'>This also show history of deleted clothes</p>
                        <a className='btn btn-success' onClick={(e) => handleDownload('clothes_used','excel')}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='container-bordered'>
                        <h5 className='mb-0'>Wash History Data</h5>
                        <p className='text-secondary'>This also show history of deleted clothes</p>
                        <a className='btn btn-success' onClick={(e) => handleDownload('wash','excel')}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='container-bordered'>
                        <h5 className='mb-0'>Apps History Data</h5>
                        <p className='text-secondary'>All your activity within this apps</p>
                        <a className='btn btn-success' onClick={(e) => handleDownload('history','excel')}><FontAwesomeIcon icon={faDownload}/> Download Excel</a>
                    </div>
                </div>
            </div>
        </>
    )
}
  