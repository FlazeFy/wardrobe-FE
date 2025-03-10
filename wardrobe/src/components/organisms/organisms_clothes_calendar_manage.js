"use client"
import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import { faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function OrganismsClothesCalendarManage(props) {
    
    return (
        <div className='box-clothes p-2'>
            <div className='d-flex justify-content-start'>
                <div style={{width:"80px"}}>
                    <img src={ props.item.clothes_image ? props.item.clothes_image : "/images/footwear.png" } className="img-clothes"/>
                </div>
                <div className='body-clothes w-100 ms-2'>
                    <h6 className='mb-0' style={{fontSize: props.type == 'schedule' ? "var(--textSM)":""}}>{props.item.clothes_name}</h6>
                    <p className={`text-secondary m-0`} style={{textTransform:"capitalize", fontSize: props.type == 'schedule' ? "var(--textXSM)":""}}>{getCleanTitleFromCtx(props.item.clothes_category)} | {props.item.clothes_type}</p>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <a className='btn btn-danger py-1 w-100'><FontAwesomeIcon icon={faTrash}/> Remove</a>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <a className='btn btn-primary py-1 w-100'><FontAwesomeIcon icon={faArrowRight}/> Detail</a>
                </div>
            </div>
        </div>
    )
}
  