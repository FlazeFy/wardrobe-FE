"use client"
import MoleculesLineChart from '../../../../components/molecules/molecules_line_chart'
import { getCookie } from '../../../..//modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'

export default function UsedMonthlyClothesUsed(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")

    const fetchMonthlyClothesUsed = (year) => {
        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/monthly/used/${year}`, {
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
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    }

    useEffect(() => {
        Swal.showLoading()
        if (props.year) {
            fetchMonthlyClothesUsed(props.year)
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
  