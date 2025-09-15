"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../../../modules/storages/cookie'
import { messageError } from '@/modules/helpers/message'
import { recoverClothesById } from '@/modules/repositories/clothes_repository'

export default function RecoverClothesById(props) {
    const tokenKey = getCookie("token_key")

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
            if (result.isConfirmed) {
                try {
                    recoverClothesById(id, tokenKey, props.fetchTrash())
                } catch (error) {
                    messageError(error)
                }
            } 
        })
    }

    return <button className='btn btn-success btn-recover ms-2' onClick={(e)=>handleRecover(props.id)}><FontAwesomeIcon icon={faRotateLeft}/>{ props.button_with_title && <> Recover</>}</button>
}