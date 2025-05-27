"use client"
import { getCookie } from '../../../../../modules/storages/cookie'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'
import { getErrorValidation } from '@/modules/helpers/converter'

export default function ClothesDetailAddSchedule(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [msgAll, setResMsgAll] = useState(null)
    const tokenKey = getCookie("token_key")
    const [day, setDay] = useState("")
    const [isRemind, setIsRemind] = useState(true)
    const [scheduleNote, setScheduleNote] = useState("")


    // Dictionaries for select options
    const [dayDictionary, setDayDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setDayDictionary(['Sun','Mon','Tue','Wed','Thu','Fri','Sat'])
        setIsLoaded(true)
    },[])

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "day" : day,
                "is_remind" : isRemind,
                "schedule_note" : scheduleNote,
                "clothes_id" : props.id
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/schedule", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`,
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
                    confirmButtonText: "Okay!"
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
            const msg = getErrorValidation(error.response.data.message)
            
            if (error.response && (error.response.status === 422 || error.response.status === 409)) {
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: msg,
                    confirmButtonText: "Okay!"
                });
    
                setResMsgAll(msg)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                });
    
                setResMsgAll(error);
            }
        }
    }

    const preventDeleted = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't add schedule from deleted clothes. Recover it to make it editable",
            confirmButtonText: "Okay!"
        })
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
                    props.deleted_at ?
                        <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" onClick={preventDeleted}><FontAwesomeIcon icon={faPlus}/> Schedule</button>
                    :
                        <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" data-bs-toggle="modal" data-bs-target="#addScheduleModal"><FontAwesomeIcon icon={faPlus}/> Schedule</button>
                }
                <div className="modal fade" id="addScheduleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Schedule</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <MoleculesField title="Day" id="day" type="select" defaultValue={day} items={dayDictionary} handleChange={(e) => setDay(e.target.value)}/>
                                <MoleculesField title="Notes" id="schedule_note" type={'textarea'} defaultValue={scheduleNote} handleChange={(e) => {
                                    setScheduleNote(e.target.value)
                                }}/>
                                <MoleculesField title="Is Remind" type="toggle" defaultValue={isRemind == 1 ? true : false} handleChange={(e)=>setIsRemind(e == true ? 1 : 0)}/>
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
