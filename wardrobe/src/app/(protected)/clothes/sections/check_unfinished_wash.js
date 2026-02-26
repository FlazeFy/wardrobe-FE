"use client"
import MoleculesUnfinishedWashBox from '../../../../components/molecules/molecules_unfinished_wash_box'
import { faArrowRight, faCheck, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import AtomsBreakLine from '../../../../components/atoms/atoms_breakline'
import { getUnfinishedWashRepo } from '@/modules/repositories/clothes_repository'
import Link from "next/link"

export default function ClothesSectionUnfinishedWash(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()

        // Fetch repo
        getUnfinishedWashRepo(
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
        if(items){
            return (
                <>
                    <AtomsBreakLine length={1}/>
                    <div className='alert alert-warning'> 
                        <h4 className="mb-0 fw-bold"><FontAwesomeIcon icon={faWarning}/> Unfinished Wash</h4>
                        <div className='row mb-3'>
                            {
                                items.map((dt,idx)=>{
                                    return (
                                        <div className={props.source == "clothes_page" ? 'col-lg-4 col-md-6 col-sm-12 col-12' :'col-lg-12 col-md-12 col-sm-12 col-12' } key={idx}> 
                                            <MoleculesUnfinishedWashBox item={dt}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            props.source == "clothes_page" && (
                                <h5 className="text-secondary">For more wash history you can 
                                    <Link href="/clothes/wash">
                                        <button className="btn btn-primary mx-2"><FontAwesomeIcon icon={faArrowRight}/> See More</button>
                                    </Link>
                                    . Or maybe <a className="btn btn-success text-white"><FontAwesomeIcon icon={faCheck}/> Finish All Wash</a>
                                </h5>
                            )
                        }
                        
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }
}
  