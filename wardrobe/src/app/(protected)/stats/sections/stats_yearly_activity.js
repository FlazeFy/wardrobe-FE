"use client"
import MoleculesChartHeatmap from '../../../../components/molecules/molecules_heatmap'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { fetchYearlyActivity } from '@/modules/repositories/stats_repository'

export default function StatsYearlyActivity(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetchYearlyActivity(
            (result) => {
                setIsLoaded(true)
                setItems(result)
            }, 
            (error) => {
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return <MoleculesChartHeatmap items={items} height={260}/>
    }
}
  