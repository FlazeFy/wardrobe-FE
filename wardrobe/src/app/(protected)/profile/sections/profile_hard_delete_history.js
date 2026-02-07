"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLocal } from '../../../../modules/storages/local'
import { hardDeleteHistory } from '@/modules/repositories/history_repository'

export default function ProfileSectionHardDeleteHistory(props) {
    const tokenKey = getLocal("token_key")

    // Repositories
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this history?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                hardDeleteHistory(id,props.fetchHistory,tokenKey)
            } 
        })
    }

    return <button className='btn btn-danger btn-delete-history' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}