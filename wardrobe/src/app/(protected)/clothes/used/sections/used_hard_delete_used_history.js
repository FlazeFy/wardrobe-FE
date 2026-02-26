"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteUsedHistoryByIdRepo } from '@/modules/repositories/clothes_repository'

export default function UsedHardDeleteUsedHistory(props) {
    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this history?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!",
        }).then(async (result) => {
            if (result.isConfirmed) deleteUsedHistoryByIdRepo(id,props.fetchClothes())
        })
    }

    return <button className='btn btn-danger' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}