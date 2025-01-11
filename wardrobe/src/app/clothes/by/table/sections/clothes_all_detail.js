"use client"
import { getCleanTitleFromCtx, numberToPrice } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'

export default function ClothesSectionAllDetail(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/detail/all/desc`, {
            headers: {
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
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
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
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
                        <th style={{width:'120px'}}>Price</th>
                        <th style={{width:'200px'}}>Status</th>
                        <th>Properties</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((el)=>{
                            return <tr>
                                <td className='text-center'>{el.clothes_qty}x</td>
                                <td>{el.clothes_name}</td>
                                <td>{el.clothes_desc ?? <span className="fst-italic text-secondary">- No Description Provided -</span>}</td>
                                <td>
                                    <h6 className='m-0'>Merk</h6>
                                    <p className='m-0 mb-2'>{el.clothes_merk ?? '-'}</p>
                                    <h6 className='m-0'>Size</h6>
                                    <p className='m-0 mb-2'>{el.clothes_size}</p>
                                    <h6 className='m-0'>Gender</h6>
                                    <p className='m-0 mb-2'>{el.clothes_gender}</p>
                                    <h6 className='m-0'>Made From</h6>
                                    <p className='m-0 mb-2'>{el.clothes_made_from}</p>
                                    <h6 className='m-0'>Color</h6>
                                    <p className='m-0'>{el.clothes_color}</p>
                                </td>
                                <td>
                                    <h6 className='m-0'>Category</h6>
                                    <p className='m-0 mb-2'>{getCleanTitleFromCtx(el.clothes_category)}</p>
                                    <h6 className='m-0'>Type</h6>
                                    <p className='m-0'>{el.clothes_type}</p>
                                </td>
                                <td>{el.clothes_price ? <>Rp. {numberToPrice(el.clothes_price)}</> : '-'}</td>
                                <td className='text-center'>
                                    {
                                        el.is_favorite == 1 && (
                                            <div className='box-icon' title="Favorited">
                                                <img src={"/images/favorite.png"}/>
                                            </div>
                                        )
                                    }
                                    {
                                        el.is_scheduled == 1 && (
                                            <div className='box-icon' title="Scheduled">
                                                <img src={"/images/scheduled.png"}/>
                                            </div>
                                        )
                                    }
                                    {
                                        el.has_washed == 1 && (
                                            <div className='box-icon' title="Has Washed">
                                                <img src={"/images/dry.png"}/>
                                            </div>
                                        )
                                    }
                                    {
                                        el.has_ironed == 1 && (
                                            <div className='box-icon' title="Has Ironed">
                                                <img src={"/images/ironed.png"}/>
                                            </div>
                                        )
                                    }
                                </td>
                                <td>
                                    <h6 className='m-0'>Buy At</h6>
                                    <p className='m-0 mb-2'>{el.clothes_buyed_at ?? '-'}</p>
                                    <h6 className='m-0'>Created At</h6>
                                    <p className='m-0 mb-2'>{el.created_at}</p>
                                    <h6 className='m-0'>Updated At</h6>
                                    <p className='m-0'>{el.updated_at}</p>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        )
    }
}
  