"use client"
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function ClothesSectionTotalByType(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")
    const now = new Date()

    const fetchTotalClothes = () => {
        const oldTimeHit = getLocal('last_hit-total_clothes_by_type')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)

        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data.data) 
        }
        
        if(timeDiffInSec < 180 && oldTimeHit){
            const oldData = JSON.parse(getLocal('total_clothes_by_type_temp'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/by/clothes_type`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`, 
                },
            })
            .then(res => res.json())
                .then(
                (result) => {
                    fetchData(result)
                    storeLocal('total_clothes_by_type_temp', JSON.stringify(result))
                    storeLocal('last_hit-total_clothes_by_type', JSON.stringify(now))
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
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchTotalClothes()
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
            <div className='d-block mx-auto' style={{width:"700px"}}> 
                <div className='d-flex justify-content-end'>
                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>All Types</h1>
                </div>
                <div className='text-end'>
                    {
                        items.map((dt, idx) => <h4 className="mb-0" key={idx}><b>{dt.total}</b> <span className='text-secondary'>{dt.context}</span></h4>)
                    }
                </div>
            </div>
        )
    }
}
  