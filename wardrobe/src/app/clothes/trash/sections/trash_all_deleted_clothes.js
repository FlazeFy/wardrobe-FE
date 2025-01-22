"use client"
import { getCleanTitleFromCtx, numberToPrice } from '../../../../modules/helpers/converter'
import { getCookie } from '../../../../modules/storages/cookie'
import { faFire, faPenToSquare, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'

export default function ClothesSectionAllDeletedClothes(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/trash`, {
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
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th style={{width:'200px'}}>Clothes Name</th>
                        <th style={{width:'200px'}}>Description</th>
                        <th style={{minWidth:'200px'}}>Detail</th>
                        <th style={{minWidth:'200px'}}>Category & Type</th>
                        <th>Properties</th>
                        <th style={{width:'140px'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((el, idx)=>{
                            return <tr key={idx}>
                                <td className='text-center'>{el.clothes_qty}</td>
                                <td>{el.clothes_name}</td>
                                <td>{el.clothes_desc ?? <span className="fst-italic text-secondary">- No Description Provided -</span>}</td>
                                <td>
                                    <h6 className='m-0'>Size</h6>
                                    <p className='m-0 mb-2'>{el.clothes_size}</p>
                                    <h6 className='m-0'>Gender</h6>
                                    <p className='m-0 mb-2'>{el.clothes_gender}</p>
                                    <h6 className='m-0'>Color</h6>
                                    <p className='m-0'>{el.clothes_color}</p>
                                </td>
                                <td>
                                    <h6 className='m-0'>Category</h6>
                                    <p className='m-0 mb-2'>{getCleanTitleFromCtx(el.clothes_category)}</p>
                                    <h6 className='m-0'>Type</h6>
                                    <p className='m-0'>{el.clothes_type}</p>
                                </td>
                                <td>
                                    <h6 className='m-0'>Deleted At</h6>
                                    <p className='m-0 mb-2'>{el.deleted_at}</p>
                                </td>
                                <td>
                                    <a className='btn btn-danger me-2'><FontAwesomeIcon icon={faFire}/></a>
                                    <a className='btn btn-success'><FontAwesomeIcon icon={faRotateLeft}/></a>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    }
}
  