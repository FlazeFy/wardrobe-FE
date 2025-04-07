"use client"
import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getCookie } from '../../../modules/storages/cookie'
import { getLocal } from '@/modules/storages/local'
import { postSaveOutfit } from '@/modules/api/outfit/service'

export default function ProfileSectionSignOut(props) {
    //Initial variable
    const tokenKey = getCookie("token_key")

    // Services
    const handleSubmit = async () => {
        const validateSignOut = () => {
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
        const saveGeneratedOutfits = (token) => {
            postSaveOutfit(token)
        }

        const generatedOutfit = JSON.parse(getLocal('generated_outfit_history'))
        if(generatedOutfit && generatedOutfit.length > 0){
            Swal.fire({
                title: "Hold up!",
                html: `There are still <b>${generatedOutfit.length} generated outfits</b> that need to be saved. If you sign out now, you will <b>lose the data</b>`,
                icon: "warning",
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: "Yes, Keep Proceed!",
                cancelButtonText: "No, Cancel!",
                denyButtonText: "Save Outfits First",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    validateSignOut()
                } else if (result.isDenied) {
                    saveGeneratedOutfits(tokenKey)
                } else {
                    Swal.close()
                }
            })
        } else {
            validateSignOut()
        }
    }

    return <button className='btn btn-danger w-100 py-4' id="sign_out-button" style={{fontWeight:"600",fontSize:"var(--textXLG)"}} onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faSignOut}/> Sign Out</button>
}