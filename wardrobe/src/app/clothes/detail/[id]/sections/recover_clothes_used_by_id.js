"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'

import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RecoverClothesUsedById(props) {
    //Initial variable
    // const token = getLocal("token_key")

    // Services
    const handleSubmit = async (id) => {
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
                    let response = await Axios.put(`http://127.0.0.1:8000/api/v1/clothes/recover/${id}`, null, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`,
                        }
                    })
                    
                    if(response.status === 200){
                        Swal.fire({
                            title: "Success!",
                            text: response.data.message,
                            icon: "success"
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
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                }
            } 
        })
    }

    return <button className='btn btn-success ms-2' onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faRotateLeft}/> Recover</button>
}