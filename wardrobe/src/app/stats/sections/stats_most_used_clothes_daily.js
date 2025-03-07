"use client"
import OrganismsClothesHeader from '../../../components/organisms/organisms_clothes_header'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'

export default function StatsSectionMostUsedClothesDaily(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")
    const [today, setToday] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/most/used/daily`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)

                const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
                setToday(today)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
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
            <div className='py-1'> 
                {
                    items.map((dt)=>{
                        return <div className='mb-2'>
                            <h4 data-bs-toggle="collapse" href={"#collapseMostUsedDaily_"+dt.day}><span className='btn btn-primary rounded-pill px-3 w-100 text-start'>
                                {dt.day == today && <a className='btn btn-danger py-1 px-3'>Today</a>} {dt.day}</span>
                            </h4>
                            <div className={dt.day == today ? 'collapse show' :'collapse'} id={"collapseMostUsedDaily_"+dt.day}>
                                <div className='row' id="collapseExample">
                                    {
                                        dt.clothes && dt.clothes.length > 0 ?
                                            dt.clothes.map(cl => {
                                                return <div className='col-lg-3 col-md-4 col-sm-6 col-6'>
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
            </div>
        )
    }
}
  