"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteClothesUsedByIdRepo } from '@/modules/repositories/clothes_repository'

export default function HarddeleteClothesUsedByIdRepo(props) {
    // Services
    const handleSubmit = async (id, is_deleted) => {
        if(is_deleted){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can't remove used history. Recover it to make it editable",
                confirmButtonText: "Okay!"
            })
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "Want to permanentally delete this clothes used history?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete it!",
                cancelButtonText: "No, Cancel!"
            }).then(async (result) => {
                if (result.isConfirmed) deleteClothesUsedByIdRepo(id,props.fetchClothes())
            })
        }
    }

    return <button className='btn btn-danger btn-delete' onClick={(e)=>handleSubmit(props.id, props.is_deleted)}><FontAwesomeIcon icon={faTrash}/></button>
}