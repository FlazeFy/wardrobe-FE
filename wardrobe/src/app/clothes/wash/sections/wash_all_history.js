"use client"
import { getLocal } from '../../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import OrganismsClothesWashBox from '../../../../components/organisms/organisms_clothes_wash_box'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { fetchWashClothes } from '@/modules/repositories/wash_repository'

export default function WashSectionAllHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getLocal("token_key")
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchWashClothes(page, 
            (result) =>{
                setIsLoaded(true)
                setItems(result.status === 400 ? null : result.data.data)
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
            <div className='row'>
                {
                    items && items.length > 0 ? 
                        items.map((dt,idx) => {
                            return <div className='col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12' key={idx}>
                                <OrganismsClothesWashBox key={idx} item={dt} fetchWashClothes={fetchWashClothes}/>
                            </div>
                        })
                    : 
                        <MoleculesNoData title="No Wash History Found"/>
                }
            </div>
        )
    }
}
  