"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../../../modules/storages/cookie'
import { messageError } from '@/modules/helpers/message'
import { deleteScheduleById } from '@/modules/repositories/schedule_repository'

export default function HardDeleteSchedule(props) {
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this schedule?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteScheduleById(id,tokenKey,props.fetchClothes())
            } 
        })
    }

    return <button className='btn btn-danger btn-delete' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}