"use client"
import MoleculesUnfinishedWashBox from '../../../components/molecules/molecules_unfinished_wash_box'
import { faArrowRight, faCheck, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'

export default function ClothesSectionUnfinishedWash(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    const fetchUnfinishedWash = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/wash_unfinished`, {
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
            })
            setError(error)
        })
    }

    useEffect(() => {
        fetchUnfinishedWash()
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
        if(items){
            return (
                <div className='alert alert-warning'> 
                    <h2 className="mb-0 fw-bold"><FontAwesomeIcon icon={faWarning}/> Unfinished Wash</h2>
                    <div className='row mb-3'>
                        {
                            items.map((el)=>{
                                return (
                                    <div className='col-lg-4 col-md-6 col-sm-12 col-12'> 
                                        <MoleculesUnfinishedWashBox item={el}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h5 className="text-secondary">For more wash history you can <a className="btn btn-link mx-2" href={"/clothes/wash"}><FontAwesomeIcon icon={faArrowRight}/> See More</a>
                    . Or maybe <a className="btn btn-link bg-success text-white"><FontAwesomeIcon icon={faCheck}/> Finish All Wash</a>
                    </h5>
                </div>
            )
        } else {
            return <></>
        }
    }
}
  