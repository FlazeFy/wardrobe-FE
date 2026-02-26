"use client"
import OrganismsClothesHeader from '../../../../components/organisms/organisms_clothes_header'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { getAllClothesHeaderRepo } from '@/modules/repositories/clothes_repository'

export default function ClothesSectionAllHeader(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()

        // Fetch repo
        getAllClothesHeaderRepo(
            (data) => {
                Swal.close()
                setIsLoaded(true)
                setItems(data)
            },
            () => {
                Swal.close()
                setIsLoaded(true)
                setItems(null)
            },
            (error) => {
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='row' id="clothes_holder"> 
                {
                    items ? 
                        items.map((dt, idx) => (
                            <div key={idx} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12'>
                                <OrganismsClothesHeader items={dt} type="clothes" handleClick={() => window.location.href = `/clothes/detail/${dt.id}`}/>
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
  