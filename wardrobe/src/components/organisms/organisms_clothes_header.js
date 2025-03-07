"use client"
import React from 'react'
import { convertDatetimeBasedLocal, getCleanTitleFromCtx } from '../../modules/helpers/converter'
import { faArrowRight, faMars, faPlus, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MoleculesClothesStatus from '../molecules/molecules_clothes_status'
import ClothesDetailAddUsedHistory from '@/app/clothes/detail/[id]/sections/clothes_detail_add_used_history'

export default function OrganismsClothesHeader(props) {
    const handleBoxClick = (id, type) => {
        if(type != 'clothes'){
            window.location.href = `/clothes/detail/${id}`
        }
    };
    
    return (
        <>
            <div className={`box-clothes ${props.type == 'schedule' ? 'p-2':''}`} onClick={(e) => (props.handleClick ? props.handleClick() : handleBoxClick(props.items.id, props.type))}>
                {
                    props.type == 'clothes' &&
                        <div className='label-holder'>
                            { props.items.clothes_size != "-" && <span className='label-clothes bg-primary'>{ props.items.clothes_size }</span> }
                            { props.items.clothes_gender == "male" ? <span className='label-clothes bg-primary'><FontAwesomeIcon icon={faMars}/></span> :
                                props.items.clothes_gender == "female" ? <span className='label-clothes bg-danger'><FontAwesomeIcon icon={faVenus}/></span> :
                                <span className='label-clothes bg-primary'><FontAwesomeIcon icon={faVenusMars}/></span>
                            }
                            { props.items.clothes_qty > 1 && <span className='label-clothes bg-primary'>{props.items.clothes_qty}x</span>}
                        </div>
                }
                <img src={ props.items.clothes_image ? props.items.clothes_image : props.items.clothes_image == null && props.type != "random" ? "/images/footwear.png" : "/images/question_box.png" } className="img-clothes"/>
                <div className='body-clothes'>
                    <h4 className='mb-0' style={{fontSize: props.type == 'schedule' ? "var(--textSM)":""}}>{props.items.clothes_name}</h4>
                    <h6 className={`text-secondary ${props.type == 'schedule' ? 'm-0':''}`} style={{textTransform:"capitalize", fontSize: props.type == 'schedule' ? "var(--textXSM)":""}}>{getCleanTitleFromCtx(props.items.clothes_category)} | {props.items.clothes_type}</h6>
                    {   props.type == 'clothes' && <MoleculesClothesStatus item={props.items}/> }
                    {
                        (props.items.total && props.items.last_used) && (
                            <>
                                <hr className='my-2'></hr>
                                <h6 className='text-secondary m-0' style={{fontSize:"var(--textSM)"}}><b>Total Used</b> : {props.items.total}</h6>
                                <h6 className='text-secondary m-0' style={{fontSize:"var(--textSM)"}}><b>Last Used</b></h6>
                                <h6 className='text-secondary m-0' style={{fontSize:"var(--textSM)"}}>{convertDatetimeBasedLocal(props.items.last_used)}</h6>
                            </>
                        )
                    }
                </div>
                {
                    props.type == 'clothes' && (
                        <div className='row mt-2'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <a className='btn btn-success w-100' data-bs-toggle="modal" data-bs-target={"#addHistoryModal_"+props.items.id}><FontAwesomeIcon icon={faPlus}/> Use It Now!</a>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <a className='btn btn-primary w-100' href={`/clothes/detail/${props.items.id}`}><FontAwesomeIcon icon={faArrowRight}/> Detail</a>
                            </div>
                        </div>
                    )
                }
            </div>
            <ClothesDetailAddUsedHistory id={props.items.id} clothes_name={props.items.clothes_name} ctx="add_used_history" deleted_at={props.items.deleted_at} with_button={false}/>
        </>
    )
}
  