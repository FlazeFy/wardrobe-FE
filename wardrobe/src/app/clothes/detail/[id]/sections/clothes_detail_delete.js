"use client"
import React, { useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MoleculesField from '../../../../../components/molecules/molecules_field'
import { countDiffInDays } from '../../../../../modules/helpers/converter'
import RecoverClothesUsedById from './recover_clothes_by_id'
import { getCookie } from '../../../../../modules/storages/cookie'
import { useRouter } from 'next/navigation'
import { messageError } from '@/modules/helpers/message'

export default function ClothesDetailDeleteClothesById(props) {
    const [isValidated, setIsValidated] = useState(false)
    const [clothesName, setClothesName] = useState('')
    const tokenKey = getCookie("token_key")
    const router = useRouter()

    // Services
    const handleSubmit = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Want to ${props.type_delete == 'hard' ? 'permanentally delete' : 'delete' } this clothes?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let response = await Axios.delete(`http://127.0.0.1:8000/api/v1/clothes/${props.type_delete == 'hard' ? 'destroy' : 'delete'}/${id}`, {
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
                                if(props.type_delete == 'hard'){
                                    router.push('/clothes')
                                } else {
                                    props.fetchClothes()
                                }
                            }
                        })
                    } else {
                        messageError("Something went wrong!")
                    }
                } catch (error) {
                    messageError(error)
                }
            } 
        })
    }

    const dayRemain = countDiffInDays(props.deleted_at)

    return (
        <div className='alert alert-danger' role='alert' id="delete_clothes-section">
            <h2 className="mb-0 fw-bold"><FontAwesomeIcon icon={faTriangleExclamation}/> {props.type_delete == 'hard' && <>Permanentally</>} Delete Clothes</h2>
            {
                props.type_delete == 'hard' ?
                    <p>This item has been deleted. You can <b>Recover</b> or <b>Permanentally Delete</b> it. This clothes is <b>{dayRemain != 30 ? 30 - dayRemain : 30} days</b> away from permanentally delete</p>
                : 
                    <p>You can delete this clothes and still can be <b>Recovered</b> before it pass <b>30 days</b> since it was deleted. And also you can permanentally delete it right now after normal delete if you want it dissapear before 30 days</p>
            }
            <MoleculesField title="Re-Type your Clothes Name to Verify Delete" id="clothes_name_delete_confirmation" type={'text'} defaultValue={clothesName} handleChange={(e) => {
                e.target.value == props.clothes_name ? setIsValidated(true) : setIsValidated(false) 
                setClothesName(e.target.value)
            }}/>
            <div className='d-flex justify-content-start'>
                <button className='btn btn-danger' disabled={!isValidated} onClick={(e)=>handleSubmit(props.id)}><FontAwesomeIcon icon={faTrash}/> Delete</button>
                {
                    props.type_delete == 'hard' && <RecoverClothesUsedById id={props.id} button_with_title={true} fetchClothes={props.fetchClothes}/>
                }
            </div>
        </div>
    ) 
    
}