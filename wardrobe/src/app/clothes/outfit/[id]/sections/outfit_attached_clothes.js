"use client"
import OrganismsClothesHeader from '../../../../../components/organisms/organisms_clothes_header'
import React from 'react'

export default function OutfitSectionAttachedClothes(props) {
    return (
        <>
            <h2 className="fw-bold">Attached Clothes</h2>
            <div className='row'>
                {
                    props.items && props.items.length > 0 ?
                        props.items.map((cl, idx)=>{
                            return (
                                <div key={idx} className='col-xxl-3 col-xl-4 col-lg-6 col-md-3 col-sm-4 col-6'>
                                    <OrganismsClothesHeader items={cl} type="clothes-outfit"/>
                                </div>
                            )
                        })
                    : 
                        <span className="fst-italic text-secondary">- No Clothes Attached -</span>
                }
            </div>
        </>
    )
}
  