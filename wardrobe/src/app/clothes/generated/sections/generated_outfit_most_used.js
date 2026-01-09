"use client"
import { getLocal } from '../../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesChartBar from '../../../../components/molecules/molecules_chart_bar'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { fetchOutfitMostUsed } from '@/modules/repositories/stats_repository'
import Swal from 'sweetalert2'

export default function GeneratedSectionOutfitMostUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getLocal("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetchOutfitMostUsed(
            props.year, 
            (result) => {
                setIsLoaded(true)
                setItems(result)
            },
            (err) => {
                setError(err)
            },
            tokenKey)
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="mx-4 text-center mx-auto form-container" style={{ width: "1280px" }} id="most_used_outfit_stats-section">
                <h1 className="mb-3" style={{ fontSize: "74px", fontWeight: "800" }}>Most Used</h1>
                <h5 className="text-secondary">We have count the most used outfit and its total</h5> 
                { items ? <MoleculesChartBar items={items}/> : <MoleculesNoData title="No Clothes Found"/> } 
            </div>
        )
    }
}
  