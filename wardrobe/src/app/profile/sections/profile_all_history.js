"use client"
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'
import ProfileSectionHardDeleteHistory from './profile_hard_delete_history'

export default function ProfileSectionAllHistory(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(1)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetchHistory()
    },[])

    const fetchHistory = () => {
        fetch(`http://127.0.0.1:8000/api/v1/history?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data.data) 
                setMaxPage(result.data.last_page)
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
            <div> 
                <h2 className="fw-bold">My History</h2>
                {
                    items.map((dt, idx) => (
                        <div key={idx} className="container-bordered">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h6 className='mb-0'>{dt.history_type} {dt.history_context}</h6>
                                    <p className='mb-0 text-secondary'>At {dt.created_at}</p>
                                </div>
                                <ProfileSectionHardDeleteHistory id={dt.id} fetchHistory={fetchHistory}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
  