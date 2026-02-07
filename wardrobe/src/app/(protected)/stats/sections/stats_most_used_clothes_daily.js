"use client"
import OrganismsClothesHeader from '../../../../components/organisms/organisms_clothes_header'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { getLocal } from '../../../../modules/storages/local'
import { fetchMostUsedClothesDaily } from '@/modules/repositories/stats_repository'

export default function StatsSectionMostUsedClothesDaily(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getLocal("token_key")
    const [today, setToday] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetchMostUsedClothesDaily(
            (result) => {
                setIsLoaded(true)
                setItems(result)
                const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
                setToday(today)
            },
            (err) => {
                setError(err)
            },
            tokenKey
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return items.map((dt, idx)=>{
            return <div className='mb-2 day_section-box' key={"used-clothes-"+idx}>
                <h4 data-bs-toggle="collapse" href={"#collapseMostUsedDaily_"+dt.day}><span className='btn btn-primary rounded-pill px-3 w-100 text-start'>
                    {dt.day == today && <a className='btn btn-danger py-1 px-3'>Today</a>} {dt.day}</span>
                </h4>
                <div className={dt.day == today ? 'collapse show' :'collapse'} id={"collapseMostUsedDaily_"+dt.day}>
                    <div className='row' id={`clothes_holder_${idx+1}`}>
                        {
                            dt.clothes && dt.clothes.length > 0 ?
                                dt.clothes.map((cl,cl_idx) => {
                                    return <div className='col-lg-3 col-md-4 col-sm-6 col-6' key={"found-clothes-"+cl_idx}>
                                        <OrganismsClothesHeader items={cl} type="schedule"/>
                                    </div>
                                })
                            :
                                <div className='fst-italic'>- No Clothes Has Used On This Day -</div>
                        }
                    </div>
                </div>
            </div>
        })      
    }
}
  