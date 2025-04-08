"use client"
import { convertDatetimeBasedLocal } from '../../../../../modules/helpers/converter';
import React from 'react'

export default function ClothesDetailSectionFoundedOutfit(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/outfit/${id}`
    };

    if(props.items){
        return (
            <div className='row'>
                {
                    props.items.map((dt, idx)=>{
                        return (
                            <div className='col-xl-6 col-lg-12 col-md-12 col-sm-6 col-12' key={`detail-founded-${idx}`}>
                                <div className='box-outfit-simple' onClick={(e) => handleBoxClick(dt.id)}>
                                    <h5>{dt.outfit_name}</h5>
                                    <p>{dt.outfit_note ?? <span className='text-secondary'>- No Notes Provided -</span>}</p>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h6 className='mb-0'>Total Used</h6>
                                            <p className='text-secondary mb-0'>{dt.total_used}</p>
                                        </div>
                                        <div>
                                            <h6 className='mb-0'>Last Used</h6>
                                            <p className='text-secondary mb-0'>{dt.last_used ? convertDatetimeBasedLocal(dt.last_used) : '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return <div className="my-2"><p className='text-secondary'>- No Outfit Found -</p></div>
    }
}
  