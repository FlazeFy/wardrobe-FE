"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { postSaveOutfitHistory } from '@/modules/repositories/outfit_repository'

export default function OutfitSectionPostOutfitHistory(props) {
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
                postSaveOutfitHistory(id,props)
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