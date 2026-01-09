"use client"
import { getLocal } from '../../../../../modules/storages/local'
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'
import { postSchedule } from '@/modules/repositories/clothes_repository'

export default function ClothesDetailAddSchedule(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const tokenKey = getLocal("token_key")
    const [day, setDay] = useState("")
    const [isRemind, setIsRemind] = useState(true)
    const [scheduleNote, setScheduleNote] = useState("")

    // Dictionaries for select options
    const [dayDictionary, setDayDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        setDayDictionary(['sun','mon','tue','wed','thu','fri','sat'])
        setIsLoaded(true)
    },[])

    // Services
    const handleSubmit = async (e) => {
        postSchedule(day,isRemind,scheduleNote,tokenKey,props)
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
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
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
