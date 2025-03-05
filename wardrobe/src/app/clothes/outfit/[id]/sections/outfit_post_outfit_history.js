"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../../../modules/storages/cookie'

export default function OutfitSectionPostOutfitHistory(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Do you want to use this Outfit?",
            text: "We well also add per clothes attached",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes, Used it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = {
                        outfit_id : id,
                        used_context: 'Work'
                    }
                    let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/save`, JSON.stringify(data), {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenKey}`,
                        }
                    })
                    
                    if(response.status === 201){
                        Swal.fire({
                            title: "Success!",
                            text: response.data.message,
                            icon: "success",
                            confirmButtonText: "Okay!"
                        }).then((result) => {
                            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                                props.fetchOutfit()
                                props.fetchAllHistory()
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

    return (
        <button className='btn btn-success w-100' style={{height:"80px"}} onClick={(e)=>handleSubmit(props.id)}>
            <div className='d-flex justify-content-start text-white text-start'>
                <FontAwesomeIcon icon={faFloppyDisk} style={{fontSize:"var(--textXJumbo)"}}/>
                <div className='ms-3'>
                    <h4 className="mb-0">Use this Outfit</h4>
                    <p className="mb-0">This will also add clothes used history</p>
                </div>
            </div>
        </button>
    )
}