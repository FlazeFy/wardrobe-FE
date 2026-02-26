"use client"
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { formatCurrency } from '../../../../modules/helpers/converter'
import { getClothesSummaryRepo } from '@/modules/repositories/clothes_repository'

export default function StatsSectionSummary(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const now = new Date()

    useEffect(() => {
        Swal.showLoading()
        getClothesSummaryRepo(
            now, 
            (data) => {
                setIsLoaded(true)
                setItems(data) 
            },
            (err) => {
                setError(err)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
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
  