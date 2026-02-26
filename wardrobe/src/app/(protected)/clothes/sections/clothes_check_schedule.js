"use client"
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import MoleculesScheduleMiniBox from '../../../../components/molecules/molecules_schedule_mini_box'
import { getTodayScheduleRepo } from '@/modules/repositories/clothes_repository'

export default function ClothesCheckSchedule(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const today = new Date()
    const dayName = today.toLocaleString('en-US', { weekday: 'short' })
    const dayNameLong = today.toLocaleString('en-US', { weekday: 'long' })

    useEffect(() => {
        Swal.showLoading()

        // Fetch repo
        getTodayScheduleRepo(
            dayName,
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result)
            },
            (error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        if(items){
            return (
                <div className='alert alert-primary' role='alert' id="schedule_reminder-section">
                    <div className='row'>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-6'>
                            <h4><FontAwesomeIcon icon={faCircleInfo}/> Information</h4>
                            <p className="mb-0">Don&apos;t forget, This clothes is set to wear today!</p>
                            <p className="mb-0">Today is <b>{dayNameLong}</b></p>
                        </div>
                        {
                            items && items.map((dt,idx)=>{
                                return (
                                        <div className='col-lg-3 col-md-4 col-sm-6 col-6' key={idx}>
                                            <MoleculesScheduleMiniBox item={dt}/>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            )
        } else {
            return <></>
        }
    }
}
  