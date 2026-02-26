"use client"
import MoleculesChartHeatmap from '@/components/molecules/molecules_heatmap'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '@/components/molecules/molecules_alert_box'
import { getYearlyActivityRepo } from '@/modules/repositories/stats_repository'

export default function EmbedYearlyActivity(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        Swal.showLoading()
        getYearlyActivityRepo(
            (result) => {
                setIsLoaded(true)
                setItems(result)
            }, 
            (error) => {
                setError(error)
            },
            null
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return <div className="mx-4 text-center mx-auto form-container" style={{ width: "1280px" }} id="total_used_outfit_per_month_stats-section">
            <h1 className="mb-3" style={{ fontSize: "74px", fontWeight: "800" }}>Yearly Activity</h1>
            <h5 className="text-secondary">We analyze the total activity for the last 365 days since today. You can the total for each date in this Heatmap</h5> 
            { items && items.length > 0 ? <MoleculesChartHeatmap items={items} height={260}/> : <MoleculesNoData title="No Clothes Found"/> } 
        </div>
    }
}
  