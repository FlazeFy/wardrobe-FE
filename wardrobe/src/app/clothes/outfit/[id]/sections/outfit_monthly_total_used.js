"use client"
import MoleculesLineChart from '../../../../../components/molecules/molecules_line_chart'
import { getCookie } from '../../../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../../components/molecules/molecules_no_data'
import { messageError } from '@/modules/helpers/message'

export default function OutfitSectionMonthlyTotalUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/outfit/monthly/by_outfit/2025/${props.id}`, {
            headers: {
                'Content-Type': 'application/json',
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
                messageError(error)
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <>
                <h2 className="mb-0 fw-bold">Monthly Used</h2>
                <h5 className="text-secondary">We analyze the total used of this outfit based on selected year</h5> 
                { items.length > 0 ? <MoleculesLineChart data={items}/> : <MoleculesNoData title="No Enough Data To Visualize"/>}
            </>
        )
    }
}
  