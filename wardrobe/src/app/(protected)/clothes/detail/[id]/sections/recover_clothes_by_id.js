"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PutRecoverClothesByIdRepo } from '@/modules/repositories/clothes_repository'

export default function PutRecoverClothesByIdRepo(props) {
    // Services
    const handleRecover = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to recover deleted clothes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Recover it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) PutRecoverClothesByIdRepo(id, props.getTrashRepo())
        })
    }

    return <button className='btn btn-success btn-recover ms-2' onClick={(e)=>handleRecover(props.id)}><FontAwesomeIcon icon={faRotateLeft}/>{ props.button_with_title && <> Recover</>}</button>
}