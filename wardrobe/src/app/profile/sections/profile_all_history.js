"use client"
import MoleculesNoData from '../../../components/molecules/molecules_no_data'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'
import OrganismsHistoryBox from '../../../components/organisms/organisms_history_box'

export default function ProfileSectionAllHistory(props) {
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
        .then(res => {
            if (res.status === 404) {
                setIsLoaded(true)
                setItems(null)
                setMaxPage(0)
                return null
            }
            Swal.close()
            return res.json()
        })
        .then(result => {
            if (result) {
                setIsLoaded(true)
                setItems(result.data.data) 
                setMaxPage(result.data.last_page)
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
            <div id="history-section"> 
                <h2 className="fw-bold">My History</h2>
                {
                    items ? 
                        items.map((dt, idx) => (
                            <OrganismsHistoryBox key={idx} items={dt} fetchHistory={fetchHistory}/>
                        ))
                    : <MoleculesNoData title="No History Found"/>
                }
            </div>
        )
    }
}
  