"use client"
import MoleculesNoData from '../../../components/molecules/molecules_no_data'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'
import OrganismsHistoryBox from '../../../components/organisms/organisms_history_box'
import { fetchHistory } from '@/modules/repositories/history_repository'

export default function ProfileSectionAllHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(1)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        handleFetchHistory(page)
    }, [])
    
    const handleFetchHistory = (page = 1) => {
        Swal.showLoading()
        // Repositories
        fetchHistory(
            page,
            (result) => {
                setIsLoaded(true)
                setItems(result ? result.data : null)
                setMaxPage(result ? result.last_page : 0)
                Swal.close()
            },
            (error) => {
                setError(error)
                Swal.close()
            },
            tokenKey
        )
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div id="history-section"> 
                <h2 className="fw-bold">My History</h2>
                {
                    items ? 
                        items.map((dt, idx) => (
                            <OrganismsHistoryBox key={idx} items={dt} fetchHistory={handleFetchHistory}/>
                        ))
                    : <MoleculesNoData title="No History Found"/>
                }
            </div>
        )
    }
}
  