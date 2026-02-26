"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteOutfitHistoryByIdRepo } from '@/modules/repositories/outfit_repository'

export default function OutfitSectionHardDeleteOutfitHistory(props) {
    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this outfit history?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteOutfitHistoryByIdRepo(id,()=>{
                    props.fetchOutfit()
                    props.fetchAllHistory()
                })
            } 
        })
    }

    return <button className='btn btn-danger btn-delete' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}