"use client"
import { convertDatetimeBasedLocal, getCleanTitleFromCtx, numberToPrice } from '../../../../../../modules/helpers/converter'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../../../components/molecules/molecules_no_data'
import Link from "next/link"
import { getAllClothesDetailRepo } from '@/modules/repositories/clothes_repository'

export default function ClothesSectionAllDetail(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        getAllClothesDetailRepo(
            (result) => {
                setItems(result.data)
                finish()
            },
            (error) => {
                setError(error)
                finish()
            },
            'all', 'desc'
        )

        const finish = () => {
            setIsLoaded(true)
            Swal.close()
        }
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Qty</th>
                        <th style={{width:'320px'}}>Name & Description</th>
                        <th style={{minWidth:'200px'}}>Detail</th>
                        <th style={{minWidth:'140px'}}>Category & Type</th>
                        <th style={{width:'180px'}}>Price</th>
                        <th style={{width:'180px'}}>Status</th>
                        <th>Properties</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items ? 
                            items.map((el, idx)=>{
                                return <tr key={idx}>
                                    <td className='text-center'>{el.clothes_qty}x</td>
                                    <td>
                                        <img src={el.clothes_image ?? "/images/footwear.png"} className="img-clothes img-fluid my-2"/>
                                        <h6>{el.clothes_name}</h6>
                                        <p className='mb-0 text-secondary'>{el.clothes_desc ?? <span className="fst-italic text-secondary">- No Description Provided -</span>}</p>
                                    </td>
                                    <td>
                                        <h6 className='m-0'>Merk</h6>
                                        <p className='m-0 mb-2' style={{textTransform:"capitalize"}}>{el.clothes_merk ?? '-'}</p>
                                        <h6 className='m-0'>Size</h6>
                                        <p className='m-0 mb-2'>{el.clothes_size}</p>
                                        <h6 className='m-0'>Gender</h6>
                                        <p className='m-0 mb-2' style={{textTransform:"capitalize"}}>{el.clothes_gender}</p>
                                        <h6 className='m-0'>Made From</h6>
                                        <p className='m-0 mb-2' style={{textTransform:"capitalize"}}>{el.clothes_made_from}</p>
                                        <h6 className='m-0'>Color</h6>
                                        <p className='m-0' style={{textTransform:"capitalize"}}>{el.clothes_color}</p>
                                    </td>
                                    <td>
                                        <h6 className='m-0'>Category</h6>
                                        <p className='m-0 mb-2'>{getCleanTitleFromCtx(el.clothes_category)}</p>
                                        <h6 className='m-0'>Type</h6>
                                        <p className='m-0' style={{textTransform:"capitalize"}}>{el.clothes_type}</p>
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
                                        <p className='m-0 mb-2'>{convertDatetimeBasedLocal(el.created_at)}</p>
                                        <h6 className='m-0'>Updated At</h6>
                                        <p className='m-0'>{el.updated_at ? convertDatetimeBasedLocal(el.updated_at) :'-'}</p>
                                    </td>
                                    <td>
                                        <Link href={`/clothes/detail/${el.id}`}>
                                            <button className='btn btn-warning'><FontAwesomeIcon icon={faPenToSquare}/></button>
                                        </Link>
                                    </td>
                                </tr>
                            })
                        : 
                        <tr>
                            <td colSpan={8}><MoleculesNoData title="No Clothes Found"/></td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }
}
  