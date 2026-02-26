"use client"
import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import OrganismsClothesWashBox from '../../../../../components/organisms/organisms_clothes_wash_box'
import MoleculesNoData from '../../../../../components/molecules/molecules_no_data'
import { getWashClothesRepo } from '@/modules/repositories/wash_repository'

export default function WashSectionAllHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getWashClothesRepo(page, 
            (result) =>{
                setIsLoaded(true)
                setItems(result.status === 400 ? null : result.data.data)
            },
            (error) => {
                setError(error)
            })
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='row'>
                {
                    items && items.length > 0 ? 
                        items.map((dt,idx) => {
                            return <div className='col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12' key={idx}>
                                <OrganismsClothesWashBox key={idx} item={dt} getWashClothesRepo={getWashClothesRepo}/>
                            </div>
                        })
                    : 
                        <MoleculesNoData title="No Wash History Found"/>
                }
            </div>
        )
    }
}
  