"use client"
import { getCookie } from '../../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { convertDatetimeBasedLocal } from '../../../../modules/helpers/converter'

export default function WashSectionSummary(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)
    const [dayWashDur, setDayWashDur] = useState(0)
    const [hrWashDur, setHrWashDur] = useState(0)
    const tokenKey = getCookie("token_key")

    const fetchfetchWashSummary = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/wash/summary`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => {
            if (res.status === 404) {
                setIsLoaded(true)
                setItem(null)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) {
                setIsLoaded(true)
                setItem(result.data)
                const hour = result.data.avg_wash_dur_per_clothes

                const days = Math.floor(hour / 24)
                const hours = hour % 24
                setDayWashDur(days)
                setHrWashDur(hours)
            }
            Swal.close()
        })
        .catch(error => {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Okay!"
            })
            setError(error)
        })
    }
    
    useEffect(() => {
        fetchfetchWashSummary()
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column pb-3' id="avg_wash_week-section">
                    <h5 className='mb-1'>Avg. Wash / Week</h5>
                    <span className='d-flex align-items-end'>
                        <h1 className='fw-bold text-main'>{item ? item.avg_wash_per_week : 0}</h1> 
                        <h4 className='text-secondary ms-1'>Clothes</h4>
                    </span>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column pb-3' id="avg_wash_duration_clothes-section">
                    <h5 className='mb-1'>Avg. Wash Duration / Clothes</h5>
                    <span className='d-flex align-items-end'>
                        <h1 className='fw-bold text-main'>{hrWashDur != 0 ? <>{dayWashDur} Days</> : <>-</>}</h1> 
                        <h4 className='text-secondary ms-1'>{hrWashDur != 0 && <>{hrWashDur} hr</>}</h4>
                    </span>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-12 col-12 d-flex flex-column pb-3' id="total_wash-section">
                    <h5 className='mb-1'>Total Wash</h5>
                    <span className='d-flex align-items-end'>
                        <h1 className='fw-bold text-main'>{item ? item.total_wash : 0}</h1> 
                        <h4 className='text-secondary ms-1'>Clothes</h4>
                    </span>
                </div>
                <div className='col-lg-8 col-md-12 col-sm-12 col-12 pb-3' id="most_wash-section">
                    <h5>Most Wash</h5>
                    <h3 className='fw-bold text-main'>{item ? item.most_wash : <>-</>}</h3>
                </div>
                <div className='col-lg-12 col-md-12 col-sm-12 col-12 d-flex flex-column pb-3' id="last_wash-section">
                    <h5>Last Wash</h5>
                    <span className='d-flex align-items-end'>
                        <h3 className='fw-bold text-main'>{item ? item.last_wash_clothes : <>-</>}</h3> 
                        <h5 className='text-secondary ms-1'>{item && <> on {convertDatetimeBasedLocal(item.last_wash_date)}</>}</h5>
                    </span>
                </div>
            </div>
        )
    }
}
  