"use client"
import MoleculesLineChart from '../../../../../components/molecules/molecules_line_chart'
import { getLocal } from '../../../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../../components/molecules/molecules_no_data'
import { fetchOutfitMonthlyTotalUsed } from '@/modules/repositories/stats_repository'

export default function GeneratedSectionOutfitMonthlyTotalUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getLocal("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetchOutfitMonthlyTotalUsed(
            props.year,
            (data) => {
                setIsLoaded(true)
                setItems(data)
            },
            (err) => {
                setError(err)
            },
            tokenKey
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="mx-4 text-center mx-auto form-container" style={{ width: "1280px" }} id="total_used_outfit_per_month_stats-section">
                <h1 className="mb-3" style={{ fontSize: "74px", fontWeight: "800" }}>Monthly Used</h1>
                <h5 className="text-secondary">We analyze the total used of all outfit based on selected year</h5> 
                { items && items.length > 0 ? <MoleculesLineChart data={items}/> : <MoleculesNoData title="No Clothes Found"/> } 
            </div>
        )
    }
}
  