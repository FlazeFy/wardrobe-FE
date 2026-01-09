"use client"
import MoleculesNoData from '../../../components/molecules/molecules_no_data'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getLocal, storeLocal } from '../../../modules/storages/local'
import { messageError } from '@/modules/helpers/message'

export default function ClothesSectionTotalByType(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getLocal("token_key")
    const now = new Date()

    const fetchTotalClothes = () => {
        const oldTimeHit = getLocal('last_hit-total_clothes_by_type')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)

        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data.data) 
        }
        
        if(timeDiffInSec < 180 && oldTimeHit){
            const oldData = JSON.parse(getLocal('total_clothes_by_type_temp'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/by/clothes_type`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`, 
                },
            })
            .then(res => res.json())
                .then(
                (result) => {
                    fetchData(result)
                    storeLocal('total_clothes_by_type_temp', JSON.stringify(result))
                    storeLocal('last_hit-total_clothes_by_type', JSON.stringify(now))
                },
                (error) => {
                    messageError(error)
                    setError(error)
                }
            )
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchTotalClothes()
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='d-block mx-auto'> 
                <div className='d-flex justify-content-end'>
                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>All <span className="text-main">Types</span></h1>
                </div>
                <div className='text-end' id="clothes_type_summary-holder">
                    {
                        items && items.length > 0 ? 
                            items.map((dt, idx) => <h4 className="mb-0" key={idx}><b>{dt.total}</b> {dt.context}</h4>)
                        :
                            <MoleculesNoData title="No Clothes Found" width={"100px"}/>
                    }
                </div>
            </div>
        )
    }
}
  