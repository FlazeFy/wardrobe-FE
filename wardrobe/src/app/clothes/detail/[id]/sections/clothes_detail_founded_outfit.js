"use client"
import React from 'react'

export default function ClothesDetailSectionFoundedOutfit(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/outfit/${id}`
    };

    if(props.items){
        return (
            <div className='row'>
                {
                    props.items.map((dt)=>{
                        return (
                            <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                                <div className='box-outfit-simple' onClick={(e) => handleBoxClick(dt.id)}>
                                    <h5 className='mb-0'>{dt.outfit_name}</h5>
                                    <p>{dt.outfit_note ?? <span className='text-secondary'>- No Notes Provided -</span>}</p>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <h6 className='mb-0'>Total Used</h6>
                                            <p className='text-secondary mb-0'>{dt.total_used}</p>
                                        </div>
                                        <div>
                                            <h6 className='mb-0'>Last Used</h6>
                                            <p className='text-secondary mb-0'>{dt.last_used ?? '-'}</p>
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
  