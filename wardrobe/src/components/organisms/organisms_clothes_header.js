"use client"
import React from 'react'
import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import { faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function OrganismsClothesHeader(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/detail/${id}`
    };
    
    return (
        <div className='box-clothes' onClick={(e)=> handleBoxClick(props.items.id)}>
            <div className='label-holder'>
                { props.items.clothes_size != "-" && <span className='label-clothes bg-primary'>{props.items.clothes_size}</span>}
                { props.items.clothes_gender == "male" ? <span className='label-clothes bg-primary'><FontAwesomeIcon icon={faMars}/></span> :
                    props.items.clothes_gender == "female" ? <span className='label-clothes bg-danger'><FontAwesomeIcon icon={faVenus}/></span> :
                    <span className='label-clothes bg-primary'><FontAwesomeIcon icon={faVenusMars}/></span>
                }
                { props.items.clothes_qty > 1 && <span className='label-clothes bg-primary'>{props.items.clothes_qty}x</span>}
            </div>
            <img src={"/images/footwear.png"} className="img-clothes"/>
            <div className='body-clothes'>
                <h4 className='mb-0'>{props.items.clothes_name}</h4>
                <h6 className='text-secondary' style={{textTransform:"capitalize"}}>{getCleanTitleFromCtx(props.items.clothes_category)} | {props.items.clothes_type}</h6>
                <div className='mt-2'>
                    {
                        props.items.is_favorite == 1 && (
                            <div className='box-icon' title="Favorited">
                                <img src={"/images/favorite.png"}/>
                            </div>
                        )
                    }
                    {
                        props.items.is_scheduled == 1 && (
                            <div className='box-icon' title="Scheduled">
                                <img src={"/images/scheduled.png"}/>
                            </div>
                        )
                    }
                    {
                        props.items.has_washed == 1 && (
                            <div className='box-icon' title="Has Washed">
                                <img src={"/images/dry.png"}/>
                            </div>
                        )
                    }
                    {
                        props.items.has_ironed == 1 && (
                            <div className='box-icon' title="Has Ironed">
                                <img src={"/images/ironed.png"}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
  