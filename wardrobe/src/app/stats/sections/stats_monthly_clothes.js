"use client"
import MoleculesLineChart from '../../../components/molecules/molecules_line_chart'
import { getCookie } from '../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../components/molecules/molecules_no_data'
import { fetchMonthlyClothes } from '../../../modules/repositories/stats_repository'

export default function StatsMonthlyClothes(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        if (props.year) {
            fetchMonthlyClothes(
            props.year, 
            (data) => {
                setIsLoaded(true)
                setItems(data)
            },
            (err) => {
                setError(err)
            },
            tokenKey)
        }
    },[props.year])

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
                { items ? <MoleculesLineChart data={items}/> : <MoleculesNoData title="No Clothes Found"/> } 
            </>
        )
    }
}
  