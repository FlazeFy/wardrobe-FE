"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { faSignOut, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../modules/storages/cookie'

export default function ProfileSectionSignOut(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Want to sign out from this account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Sign Out!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await Axios.get(`http://127.0.0.1:8000/api/v1/logout`, {
                        headers: {
                            'Accept': 'application/json',
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
                                document.cookie = "cookieName=; path=/"
                                window.location.href = '/'
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

    return <button className='btn btn-danger w-100 py-4' id="sign_out-button" style={{fontWeight:"600",fontSize:"var(--textXLG)"}} onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faSignOut}/> Sign Out</button>
}