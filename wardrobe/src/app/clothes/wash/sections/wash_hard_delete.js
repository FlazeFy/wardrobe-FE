"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLocal } from '../../../../modules/storages/local'
import { deleteWashById } from '@/modules/repositories/wash_repository'

export default function WashSectionHardDeleteWash(props) {
    const tokenKey = getLocal("token_key")

    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this wash history?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteWashById(id,tokenKey,props.fetchWashClothes())
            } 
        })
    }

    return <button className='btn btn-danger btn-delete-wash' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}