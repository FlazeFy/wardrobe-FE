"use client"
import { getCookie } from '../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../components/molecules/molecules_field'
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function StatsSectionFilterMonthlyChart(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const tokenKey = getCookie("token_key")
    const now = new Date()

    // Dictionaries for select options
    const [yearDictionary, setYearDictionary] = useState([])

    const fetchYear = () => {
        const oldTimeHit = getLocal('last_hit-available_year_filter')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            const year = data.map(el => el.year.toString())
            setYearDictionary(year)
            storeLocal('available_year_filter', JSON.stringify(data))
            storeLocal('last_hit-available_year_filter', JSON.stringify(now))
        }
    
        if (timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('available_year_filter'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/user/my_year`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`, 
                },
            })
            .then(res => res.json())
            .then(result => fetchData(result.data))
            .catch(error => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            })
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchYear()
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
        return (
            <>
                <MoleculesField title="Monthly Stats" type="select" defaultValue={props.selectedYear} items={yearDictionary} handleChange={props.handleChange}/>
            </>
        )
    }
}
  