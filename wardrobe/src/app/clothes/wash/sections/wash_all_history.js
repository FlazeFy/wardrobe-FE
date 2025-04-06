"use client"
import { getCookie } from '../../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import OrganismsClothesWashBox from '../../../../components/organisms/organisms_clothes_wash_box'
import MoleculesNoData from '@/components/molecules/molecules_no_data'

export default function WashSectionAllHistory(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    const fetchWashClothes = (page = 1) => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/wash_history?page=${page}&is_detailed=true`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => {
            if (res.status === 404) {
                setIsLoaded(true)
                setItems(null)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) {
                setIsLoaded(true)
                setItems(result.data.data)
            }
            Swal.close()
        })
        .catch(error => {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                confirmButtonText: "Okay!"
            })
            setError(error)
        })
    }
    useEffect(() => {
        fetchWashClothes(1)
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
            <div className='row'>
                {
                    items && items.length > 0 ? 
                        items.map((dt) => {
                            return <div className='col-xl-6 col-lg-12 col-md-6 col-sm-12 col-12'>
                                <OrganismsClothesWashBox item={dt} fetchWashClothes={fetchWashClothes}/>
                            </div>
                        })
                    : 
                        <MoleculesNoData title="No Wash History Found"/>
                }
            </div>
        )
    }
}
  