"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getLocal } from '../../../modules/storages/local'
import { postSaveOutfit } from '../../../modules/repositories/outfit_repository'
import { useRouter } from 'next/navigation'
import { postSignOut } from '@/modules/repositories/auth_repository'

export default function ProfileSectionSignOut(props) {
    const tokenKey = getLocal("token_key")
    const router = useRouter()

    // Repositories
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
                    postSignOut(tokenKey,router)
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