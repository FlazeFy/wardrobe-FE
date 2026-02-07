"use client"
import MoleculesLineChart from '../../../../../../components/molecules/molecules_line_chart'
import { getLocal } from '../../../../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../../../components/molecules/molecules_no_data'
import { fetchOutfitMonthlyTotalUsedById } from '@/modules/repositories/outfit_repository'

export default function OutfitSectionMonthlyTotalUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getLocal("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetchOutfitMonthlyTotalUsedById(props.id, 
            (result) => {
                setIsLoaded(true)
                setItems(result)
            },
            (error) => {
                setError(error)
            },
            tokenKey)
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
  