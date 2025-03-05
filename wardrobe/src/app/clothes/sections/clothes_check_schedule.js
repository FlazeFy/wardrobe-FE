"use client"
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { getCookie } from '../../../modules/storages/cookie'
import MoleculesScheduleMiniBox from '../../../components/molecules/molecules_schedule_mini_box'

export default function ClothesCheckSchedule(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")
    const today = new Date()
    const dayName = today.toLocaleString('en-US', { weekday: 'short' })
    const dayNameLong = today.toLocaleString('en-US', { weekday: 'long' })

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/schedule/${dayName}`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data) 
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        if(items){
            return (
                <div className='alert alert-primary' role='alert'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-6'>
                            <h4><FontAwesomeIcon icon={faCircleInfo}/> Information</h4>
                            <p className="mb-0">Don't forget, This clothes is set to wear today!</p>
                            <p className="mb-0">Today is <b>{dayNameLong}</b></p>
                        </div>
                        {
                            items && items.map((dt)=>{
                                return (
                                        <div className='col-lg-3 col-md-4 col-sm-6 col-6'>
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
  