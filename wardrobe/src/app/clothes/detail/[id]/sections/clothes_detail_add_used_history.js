"use client"
import { getCookie } from '../../../../../modules/storages/cookie'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'
import { getLocal, storeLocal } from '../../../../../modules/storages/local'
import { getErrorValidation } from '@/modules/helpers/converter'
import { postUsedClothes } from '@/modules/repositories/clothes_repository'

export default function ClothesDetailAddUsedHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [msgAll, setResMsgAll] = useState(null)
    const tokenKey = getCookie("token_key")
    const [usedContext, setUsedContext] = useState("")
    const [clothesNotes, setClothesNote] = useState("")
    const now = new Date()

    // Dictionaries for select options
    const [usedContextDictionary, setUsedContextDictionary] = useState([])

    const fetchDct = () => {
        const oldTimeHit = getLocal('last_hit-dct_used_context')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            const usedContext = []
            data.forEach((el) => {
                usedContext.push(el.dictionary_name)
            })
            setUsedContextDictionary(usedContext)
            setUsedContext(usedContext[0])
        }
    
        if (timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('dct_used_context'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/dct/used_context`, {
                headers: {
                    'Authorization': `Bearer ${tokenKey}`,
                },
            })
            .then(res => res.json())
                .then(
                (result) => {
                    Swal.close()
                    setIsLoaded(true)
                    fetchData(result.data)
                    storeLocal('dct_used_context', JSON.stringify(result.data))
                    storeLocal('last_hit-dct_used_context', JSON.stringify(now)) 
                },
                (error) => {
                    Swal.close()
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                    setError(error)
                }
            )
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchDct()
    },[])

    const preventDeleted = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't add used history from deleted clothes. Recover it to make it editable",
            confirmButtonText: "Okay!"
        })
    }

    // Repositories
    const handleSubmit = async (e) => {
        postUsedClothes(usedContext,clothesNotes,tokenKey,props)
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                {
                    props.with_button &&
                        (
                            props.deleted_at ?
                                <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" onClick={preventDeleted}><FontAwesomeIcon icon={faPlus}/> History</button>
                            :
                                <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" data-bs-toggle="modal" data-bs-target={"#addHistoryModal_"+props.id}><FontAwesomeIcon icon={faPlus}/> History</button>
                        )
                }
                <div className="modal fade" id={"addHistoryModal_"+props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Used History</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    props.clothes_name && <MoleculesField title="Clothes Name" class="clothes_name" type="text" defaultValue={props.clothes_name} isDisabled={true}/>
                                }
                                <MoleculesField title="Notes" type={'textarea'} class="clothes_note" defaultValue={clothesNotes} handleChange={(e) => {
                                    setClothesNote(e.target.value)
                                }}/>
                                <MoleculesField title="Context" type="select" class="used_context" defaultValue={usedContext} items={usedContextDictionary} handleChange={(e) => setUsedContext(e.target.value)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
