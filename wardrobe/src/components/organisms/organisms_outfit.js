"use client"
import React from 'react'

export default function OrganismsOutfit(props) {
    const handleBoxClick = (id) => {
        window.location.href = `/clothes/outfit/${id}`
    };
    
    return (
        <div className={`box-clothes`} onClick={(e)=> handleBoxClick(props.items.id)}>
            <div className='row clothes-holder'>
                {
                    props.items.clothes && props.items.clothes.length > 0 ?
                        props.items.clothes.map((cl,idx)=>{
                            return (
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12 mx-auto p-2 clothes-box' key={idx}>
                                    <img src={cl.clothes_image ?? "/images/footwear.png"} className="img-clothes"/>
                                    <h6 className='mt-2 mb-0'>{cl.clothes_type} | {cl.clothes_name}</h6>
                                    <p className='mb-0 text-secondary'>{cl.clothes_merk}</p>
                                </div>
                            )
                        })
                    : 
                        <span className="fst-italic text-secondary">- No Clothes Attached -</span>
                }
            </div>
            <h4 className='mb-0 mt-2 outfit-name'>{props.items.outfit_name}</h4>
            <div>
                { props.items.total_used > 0 && <h6 className='total-used'>{props.items.total_used} Total Used</h6> }
                { 
                    props.items.is_favorite == 1 && 
                        <div className='box-icon' title="Favorite">
                            <img src={"/images/favorite.png"}/>
                        </div> 
                }
            </div>
            <p className={`text-secondary mt-2 mb-0 outfit-note`}>{props.items.outfit_note ?? <span className='fst-italic'>- No Description Provided -</span>}</p>
        </div>
    )   
}
  