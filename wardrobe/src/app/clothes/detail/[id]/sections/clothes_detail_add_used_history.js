"use client"
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'

export default function ClothesDetailAddUsedHistory(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [msgAll, setResMsgAll] = useState(null)

    const [usedContext, setUsedContext] = useState("")
    const [clothesNotes, setClothesNote] = useState("")

    // Dictionaries for select options
    const [usedContextDictionary, setUsedContextDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/dct/used_context`, {
            headers: {
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                
                const usedContext = []
                result.data.forEach((el) => {
                    usedContext.push(el.dictionary_name)
                })
                setUsedContextDictionary(usedContext)

                setUsedContext(usedContext[0])
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"+er,
                })
                setError(error)
            }
        )
    },[])

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "clothes_id" : props.id,
                "used_context" : usedContext,
                "clothes_note" : clothesNotes
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/history", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`,
                    'Content-Type' : 'application/json'
                }
            })
            Swal.close()

            if(response.status === 201){
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                       props.fetchClothes()
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                })
                setResMsgAll(response.data.message)
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            setResMsgAll(error)
        }
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" data-bs-toggle="modal" data-bs-target="#addHistoryModal"><FontAwesomeIcon icon={faPlus}/> History</button>
                <div className="modal fade" id="addHistoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Used History</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <MoleculesField title="Notes" type={'textarea'} defaultValue={clothesNotes} handleChange={(e) => {
                                    setClothesNote(e.target.value)
                                }}/>
                                <MoleculesField title="Context" type="select" defaultValue={usedContext} items={usedContextDictionary} handleChange={(e) => setUsedContext(e.target.value)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
