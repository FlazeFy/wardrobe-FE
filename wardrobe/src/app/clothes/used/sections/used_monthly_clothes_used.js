"use client"
import MoleculesLineChart from '../../../../components/molecules/molecules_line_chart'
import { getCookie } from '../../../..//modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { fetchMonthlyClothesUsed } from '@/modules/repositories/clothes_repository'

export default function UsedMonthlyClothesUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        if (props.year) {
            fetchMonthlyClothesUsed(props.year, 
                (result) => {
                    setIsLoaded(true)
                    setItems(result)
                }, (error) => {
                    setError(error)
                }, tokenKey)
        }
    },[props.year])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return items ? <MoleculesLineChart data={items}/> : <MoleculesNoData title="No Clothes Found"/>
    }
}
  