"use client"
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function OrganismsOutfit(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/generated/${id}`
    };
    
    return (
        <div className={`box-clothes`} onClick={(e)=> handleBoxClick(props.items.id)}>
            <div className='row'>
                {
                    props.items.clothes.map((cl)=>{
                        return (
                            <div className='col-lg-4 col-md-4 col-sm-12 col-12 mx-auto p-2'>
                                <img src={cl.clothes_image ?? "/images/footwear.png"} className="img-clothes"/>
                                <h6 className='mt-2 mb-0'>{cl.clothes_type} | {cl.clothes_name}</h6>
                                <p className='mb-0 text-secondary'>{cl.clothes_merk}</p>
                            </div>
                        )
                    })
                }
            </div>
            <h4 className='mb-0 mt-2'>{props.items.outfit_name}</h4>
            <div>
                { props.items.total_used > 0 && <h6>{props.items.total_used} Total Used</h6> }
                { 
                    props.items.is_favorite == 1 && 
                        <div className='box-icon' title="Favorite">
                            <img src={"/images/favorite.png"}/>
                        </div> 
                }
            </div>
            <p className={`text-secondary mt-2 mb-0`}>{props.items.outfit_note ?? <span className='fst-italic'>- No Description Provided -</span>}</p>
        </div>
    )
}
  