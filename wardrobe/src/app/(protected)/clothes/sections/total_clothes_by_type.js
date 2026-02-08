"use client"
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { getLocal, storeLocal } from '../../../../modules/storages/local'
import { fetchTotalClothesByType } from '@/modules/repositories/clothes_repository'

export default function ClothesSectionTotalByType(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const now = new Date()
    const contextKey = 'total_clothes_by_type'

    const fetchDataHandler = (result) => {
        Swal.close()
        setIsLoaded(true)
        setItems(result.data)

        // Temp data
        storeLocal(`${contextKey}_temp`, JSON.stringify(result))
        storeLocal(`last_hit-${contextKey}`, JSON.stringify(now))
    }

    const fetchTotalClothes = () => {
        // Check temp data expired time
        const oldTimeHit = getLocal(`last_hit-${contextKey}`)

        if (oldTimeHit) {
            const oldTime = new Date(JSON.parse(oldTimeHit))
            const timeDiffInSec = Math.floor((now - oldTime) / 1000)

            if (timeDiffInSec < 180) {
                const oldData = JSON.parse(getLocal(`${contextKey}_temp`))
                fetchDataHandler(oldData)
                return
            }
        }

        // Fetch repo
        fetchTotalClothesByType(
            (result) => {
                fetchDataHandler(result)
            },
            (error) => {
                setError(error)
            }
        )
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
  