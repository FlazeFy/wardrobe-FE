"use client"
import React from 'react'
import { getCleanTitleFromCtx } from '../../modules/helpers/converter'
import { faMars, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MoleculesClothesStatus from '../molecules/molecules_clothes_status'

export default function OrganismsClothesHeader(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/detail/${id}`
    };
    
    return (
        <div className={`box-clothes ${props.type == 'schedule' ? 'p-2':''}`} onClick={(e) => (props.handleClick ? props.handleClick() : handleBoxClick(props.items.id))}>
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
            </div>
        </div>
    )
}
  