"use client"
import OrganismsClothesHeader from '../../../components/organisms/organisms_clothes_header'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'

export default function ClothesSectionAllHeader({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/header/all/desc`, {
            headers: {
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data.data) 
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
            <div className='row'> 
                {
                    items.map((dt, idx) => (
                        <div key={idx} className='col-lg-3 col-md-4 col-sm-12 col-12'>
                            <OrganismsClothesHeader items={dt} type="clothes"/>
                        </div>
                    ))
                }
            </div>
        )
    }
}
  