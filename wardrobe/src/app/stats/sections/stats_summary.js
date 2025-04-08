"use client"
import { getLocal, storeLocal } from '../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { formatCurrency } from '../../../modules/helpers/converter'
import { getCookie } from '../../../modules/storages/cookie'

export default function StatsSectionSummary(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")
    const now = new Date()

    const fetchSummary = () => {
        const oldTimeHit = getLocal('last_hit-stats_summary')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data) 
        }
    
        if (timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('stats_summary'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/summary`, {
                headers: {
                    'Authorization': `Bearer ${tokenKey}`,
                },
            })
            .then(res => res.json())
                .then(
                (result) => {
                    Swal.close()
                    setIsLoaded(true)
                    fetchData(result.data)
                    storeLocal('stats_summary', JSON.stringify(result.data))
                    storeLocal('last_hit-stats_summary', JSON.stringify(now)) 
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
    }

    useEffect(() => {
        Swal.showLoading()
        fetchSummary()
    },[])

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
            <div className='d-block mx-auto' style={{width:"700px"}} id="summary_stats-section"> 
                <div className='d-flex justify-content-end'>
                    <div className='me-2 text-end'>
                        <h4 className="mb-0"><b>{items.total_clothes}</b> <span className='text-white'>Variety</span></h4>
                        <h4 className="mb-0"><b>{items.sum_clothes_qty}</b> <span className='text-white'>Quantity</span></h4>
                    </div>
                    <div>
                        <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Total <span className="text-main">Clothes</span></h1>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='me-2'>
                        <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>The <span className="text-main">Price</span></h1>
                    </div>
                    <div className='text-start'>
                        <h4 className="mb-0"><b>{items.max_price ? formatCurrency(items.max_price) : "-"}</b> <span className='text-white'>Most Expensive</span></h4>
                        <h4 className="mb-0"><b>{items.avg_price ? formatCurrency(items.avg_price) : "-"}</b> <span className='text-white'>Average</span></h4>
                    </div>
                </div>
            </div>
        )
    }
}
  