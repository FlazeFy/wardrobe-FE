"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteClothesById } from '@/modules/repositories/clothes_repository'

export default function HardDeleteClothesById(props) {
    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this clothes?",
            icon: "warning",
            showCancelButton: true, 
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) deleteClothesById(id, 'hard', props.fetchTrash())
        })
    }

    return <button className='btn btn-danger btn-delete' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faFire}/></button>
}