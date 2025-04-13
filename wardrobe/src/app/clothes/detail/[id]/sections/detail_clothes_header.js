"use client"
import AtomsBreakLine from '@/components/atoms/atoms_breakline'
import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ClothesDetailCheckDeleted from './clothes_detail_check_deleted'
import ClothesDetailCheckSchedule from './clothes_detail_check_schedule'
import ClothesDetailSectionExportData from './clothes_detail_export_data'

export default function DetailSectionClothesHeader(props) {
    return <>
        <div className="d-flex justify-content-start">
            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
            </div>
            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                <h2 className="mb-0">Category</h2>
                <h4 className="mb-0 text-secondary">{getCleanTitleFromCtx(props.items.clothes_category)}</h4>
            </div>
            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                <h2 className="mb-0">Type</h2>
                <h4 className="mb-0 text-secondary">{props.items.clothes_type}</h4>
            </div>
            <div>
                <h2 className="mb-0">Size</h2>
                <h4 className="mb-0 text-secondary">{props.items.clothes_size}</h4>
            </div>
        </div>
        <hr></hr>
        <div className="container-fluid custom-container">
            <ClothesDetailSectionExportData id={props.id}/>
            <hr></hr>
            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>{props.items.clothes_name}</h1>
            <ClothesDetailCheckDeleted items={props.items.deleted_at}/>
            <ClothesDetailCheckSchedule items={props.schedule}/>
            <p>{props.items.clothes_desc}</p>
            <AtomsBreakLine length={2}/>
        </div>
    </>
}
  