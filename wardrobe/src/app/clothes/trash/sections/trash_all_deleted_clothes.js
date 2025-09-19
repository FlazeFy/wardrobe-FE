"use client"
import { convertDatetimeBasedLocal, getCleanTitleFromCtx } from '../../../../modules/helpers/converter'
import { getCookie } from '../../../../modules/storages/cookie'
import React from 'react'
import { useState, useEffect } from "react"
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import RecoverClothesById from '../../detail/[id]/sections/recover_clothes_by_id'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import HardDeleteClothesById from './hard_delete_clothes_by_id'
import { fetchTrash } from '@/modules/repositories/clothes_repository'

export default function ClothesSectionAllDeletedClothes(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchTrash(
            (res) => {
                setIsLoaded(true)
                setItems(res)
            },
            (error) => {
                setError(error)
            },
            tokenKey
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <table className='table table-bordered' id="deleted_clothes-table">
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
                        items ? 
                            items.map((el, idx)=>{
                                return <tr key={idx}>
                                    <td className='text-center'>{el.clothes_qty}</td>
                                    <td>{el.clothes_name}</td>
                                    <td>{el.clothes_desc ?? <span className="fst-italic text-secondary">- No Description Provided -</span>}</td>
                                    <td>
                                        <h6 className='m-0'>Size</h6>
                                        <p className='m-0 mb-2'>{el.clothes_size}</p>
                                        <h6 className='m-0'>Gender</h6>
                                        <p className='m-0 mb-2' style={{textTransform:"capitalize"}}>{el.clothes_gender}</p>
                                        <h6 className='m-0'>Color</h6>
                                        <p className='m-0' style={{textTransform:"capitalize"}}>{el.clothes_color}</p>
                                    </td>
                                    <td>
                                        <h6 className='m-0'>Category</h6>
                                        <p className='m-0 mb-2'>{getCleanTitleFromCtx(el.clothes_category)}</p>
                                        <h6 className='m-0'>Type</h6>
                                        <p className='m-0' style={{textTransform:"capitalize"}}>{el.clothes_type}</p>
                                    </td>
                                    <td>
                                        <h6 className='m-0'>Deleted At</h6>
                                        <p className='m-0 mb-2'>{convertDatetimeBasedLocal(el.deleted_at)}</p>
                                    </td>
                                    <td>
                                        <HardDeleteClothesById id={el.id} fetchTrash={fetchTrash}/>
                                        <RecoverClothesById id={el.id} button_with_title={false} fetchTrash={fetchTrash}/>
                                    </td>
                                </tr>
                            })
                        :
                            <tr>
                                <td colSpan={7}>
                                    <MoleculesNoData title="No Clothes Deleted"/>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        )
    }
}
  