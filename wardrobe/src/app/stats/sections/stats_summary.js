"use client"
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { formatCurrency } from '../../../modules/helpers/converter'
import { getCookie } from '../../../modules/storages/cookie'

export default function StatsSectionSummary({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
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
                setItems(result.data) 
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className='d-block mx-auto' style={{width:"700px"}}> 
                <div className='d-flex justify-content-end'>
                    <div className='me-2 text-end'>
                        <h4 className="mb-0"><b>{items.total_clothes}</b> <span className='text-secondary'>Variety</span></h4>
                        <h4 className="mb-0"><b>{items.sum_clothes_qty}</b> <span className='text-secondary'>Quantity</span></h4>
                    </div>
                    <div>
                        <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Total Clothes</h1>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='me-2'>
                        <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>The Price</h1>
                    </div>
                    <div className='text-start'>
                        <h4 className="mb-0"><b>{formatCurrency(items.max_price)}</b> <span className='text-secondary'>Most Expensive</span></h4>
                        <h4 className="mb-0"><b>{formatCurrency(items.avg_price)}</b> <span className='text-secondary'>Average</span></h4>
                    </div>
                </div>
            </div>
        )
    }
}
  