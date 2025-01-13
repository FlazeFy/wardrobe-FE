"use client"
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'

export default function ClothesDetailAddSchedule(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [msgAll, setResMsgAll] = useState(null)

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
            if (error.response.status === 409) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                })
                setResMsgAll(error)
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setResMsgAll(error)
            }
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
                <button type="button" style={{width:"120px"}} className="btn btn-success m-0 py-2" data-bs-toggle="modal" data-bs-target="#addScheduleModal"><FontAwesomeIcon icon={faPlus}/> Schedule</button>
                <div className="modal fade" id="addScheduleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Schedule</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <MoleculesField title="Context" type="select" defaultValue={day} items={dayDictionary} handleChange={(e) => setDay(e.target.value)}/>
                                <MoleculesField title="Notes" type={'textarea'} defaultValue={scheduleNote} handleChange={(e) => {
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
