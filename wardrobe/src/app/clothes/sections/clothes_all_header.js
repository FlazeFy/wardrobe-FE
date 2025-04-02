"use client"
import OrganismsClothesHeader from '../../../components/organisms/organisms_clothes_header'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'
import MoleculesNoData from '../../../components/molecules/molecules_no_data'

export default function ClothesSectionAllHeader(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    const fetchClothes = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/header/all/desc`, {
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
        fetchClothes()
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
            <div className='row' id="clothes_holder"> 
                {
                    items ? 
                        items.map((dt, idx) => (
                            <div key={idx} className='col-lg-3 col-md-4 col-sm-12 col-12'>
                                <OrganismsClothesHeader items={dt} type="clothes"/>
                            </div>
                        ))
                    :
                    <div className='col'>
                        <MoleculesNoData title="No Clothes Found"/>
                    </div>
                }
            </div>
        )
    }
}
  