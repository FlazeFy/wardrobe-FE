"use client"
import { getLocal } from '../../../../../modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import { convertDatetimeBasedLocal } from '../../../../../modules/helpers/converter'
import { fetchLastClothesHistory } from '@/modules/repositories/clothes_repository'

export default function ClothesAddSectionLastHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)

    useEffect(() => {
        Swal.showLoading()

        // Fetch repo
        fetchLastClothesHistory(
            (data) => {
                Swal.close()
                setIsLoaded(true)
                setItem(data)
            },
            () => {
                Swal.close()
                setIsLoaded(true)
                setItem(null)
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
            <div className='d-block mx-auto' style={{width:"700px"}} id="last_history-section"> 
                <div className='d-flex justify-content-end'>
                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Last <span className="text-main">History</span></h1>
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <h5 className='mb-0'>Last Added</h5>
                        <h3 className='fw-bold'>{item ? item.last_added_clothes : '-'}</h3>
                        {
                            item && <h5 className='ms-1'>on {convertDatetimeBasedLocal(item.last_added_date)}</h5>
                        }
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                        <h5 className='mb-0'>Last Deleted</h5>
                        <h3 className='fw-bold'>{item ? item.last_deleted_clothes ?? '-' : '-'}</h3> 
                        {
                            item && <h5 className='ms-1'>on {item.last_deleted_date ? convertDatetimeBasedLocal(item.last_deleted_date) : '-'}</h5>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
  