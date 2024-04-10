import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


export default function GetClotchesByCategory({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    return (
        <div className='position-relative'> 
            <div className='px-5 d-flex justify-content-between'>
                <div>
                    <h6 className='mb-0'>60 Item | {getCleanTitleFromCtx(ctx)}</h6>
                </div>
                <div>
                    <a href={"/clothes/category/"+ctx}>See More {getCleanTitleFromCtx(ctx)} <FontAwesomeIcon icon={faArrowRight}/></a>
                </div>
            </div>
            <div id={"carouselClothes-"+ctx} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner py-2 px-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className={`carousel-item py-4 ${index === 1 ? 'active' : ''}`}>
                            <div className='row'>
                                {[1, 2, 3].map((itemIndex) => (
                                    <div key={itemIndex} className='col-lg-4'>
                                        <div className='box'>
                                            <div className='box-header'>
                                                <div className='box-icon' title="In Wash">
                                                    <img src={"/images/wash.png"}/>
                                                </div>
                                                <div className='box-icon' title="Favorite">
                                                    <img src={"/images/favorite.png"}/>
                                                </div>
                                                <div className='box-icon' title="Scheduled to wear every friday">
                                                    <img src={"/images/scheduled.png"}/>
                                                </div>
                                                <div className='box-icon' title="In Dried">
                                                    <img src={"/images/dry.png"}/>
                                                </div>
                                            </div>
                                            <img src={"/images/"+ctx+".png"}/>
                                            <div className='box-footer'>
                                                Lorem Ipsum
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target={"#carouselClothes-"+ctx} data-bs-slide="prev">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target={"#carouselClothes-"+ctx} data-bs-slide="next">
                <FontAwesomeIcon icon={faArrowRight}/>
            </button>
        </div>
    )
}
  