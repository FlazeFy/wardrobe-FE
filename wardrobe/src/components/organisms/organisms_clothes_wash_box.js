"use client"
import WashSectionHardDeleteWash from '../../app/(protected)/clothes/wash/sections/wash_hard_delete'
import { faPenToSquare, faRotateLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AtomsBreakLine from '../atoms/atoms_breakline'
import MoleculesCheckpoint from '../molecules/molecules_checkpoint'

export default function OrganismsClothesWashBox(props) {
    return (
        <div className='wash-box'>
            <h4>{props.item.clothes_name}</h4>
            <span className="btn-type me-2">{props.item.clothes_type}</span>
            <span className="btn-merk me-2">{props.item.clothes_merk}</span>
            <span className="btn-made-from">{props.item.clothes_made_from}</span>
            <p className='mb-0 mt-2'>{props.item.wash_note ? <>{props.item.wash_note}</> : <span className='fst-italic'>- No Notes Provided -</span>}</p>
            <AtomsBreakLine length={1}/>
            <h6>{props.item.wash_type} | Wash at {props.item.wash_at}</h6>
            <hr></hr>
            { props.item.wash_checkpoint && props.item.wash_checkpoint.length > 0 && <MoleculesCheckpoint list={props.item.wash_checkpoint}/> }
            <div className='d-flex justify-content-between'>
                <a className='btn btn-primary'><FontAwesomeIcon icon={faRotateLeft}/> Wash Again</a>
                <div>
                    <a className='btn btn-warning me-2'><FontAwesomeIcon icon={faPenToSquare}/></a>
                    <WashSectionHardDeleteWash id={props.item.id} fetchWashClothes={props.fetchWashClothes}/>
                </div>
            </div>
        </div>
    )
}
  