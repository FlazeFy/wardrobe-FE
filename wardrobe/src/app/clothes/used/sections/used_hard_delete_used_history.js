"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLocal } from '../../../../modules/storages/local'
import { deleteUsedHistoryById } from '@/modules/repositories/clothes_repository'

export default function UsedHardDeleteUsedHistory(props) {
    const tokenKey = getLocal("token_key")

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
            if (result.isConfirmed) {
                deleteUsedHistoryById(id,tokenKey,props.fetchClothes())
            } 
        })
    }

    return <button className='btn btn-danger' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}