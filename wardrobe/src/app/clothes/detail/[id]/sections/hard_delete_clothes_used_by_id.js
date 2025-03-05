"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../../../modules/storages/cookie'

export default function HardDeleteClothesUsedById(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to permanentally delete this clothes used?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await Axios.delete(`http://127.0.0.1:8000/api/v1/clothes/destroy_used/${id}`, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenKey}`,
                        }
                    })
                    
                    if(response.status === 200){
                        Swal.fire({
                            title: "Success!",
                            text: response.data.message,
                            icon: "success",
                            confirmButtonText: "Okay!"
                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                props.fetchClothes()
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            confirmButtonText: "Okay!"
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        confirmButtonText: "Okay!"
                    })
                }
            } 
        })
    }

    return <button className='btn btn-danger' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/></button>
}