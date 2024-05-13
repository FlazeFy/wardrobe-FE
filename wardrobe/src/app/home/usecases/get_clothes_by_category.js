import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetClotchesByCategory({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const keyToken = '76|HkWAJH66qssjePsFpldCJEg4pXTGE7tifRTClkkK92bcec9f'

    useEffect(() => {
        //Default config
        const keyOrder = getLocal("get_"+ctx)

        if(keyOrder === null){
            storeLocal("get_"+ctx,"DESC")
        }
        
        fetch(`http://127.0.0.1:8000/api/v1/clothes/header/${ctx}/${keyOrder}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                // setMaxPage(result.data.last_page)
                // setCurrPage(result.data.current_page)
                setItems(result.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className='position-relative'> 
                <div className='px-5 d-flex justify-content-between'>
                    <div>
                        <h6 className='mb-0'>{items ? items.length : 0} Item | {getCleanTitleFromCtx(ctx)}</h6>
                    </div>
                    <div>
                        <a href={"/clothes/"+ctx}>See More {getCleanTitleFromCtx(ctx)} <FontAwesomeIcon icon={faArrowRight}/></a>
                    </div>
                </div>
                <div id={"carouselClothes-"+ctx} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner py-2 px-4">
                        {
                            items ? 
                                Array.from({ length: Math.ceil(items.length / 3)}).map((_, index) => (
                                    <div key={index} className={`carousel-item py-4 ${index === 1 || Math.ceil(items.length / 3) == 1 ? 'active' : ''}`}>
                                        <div className='row'>
                                            {
                                                items.map((data, i, idx) => (
                                                    <div key={idx} className='col'>
                                                        <div className='box'>
                                                            <div className='box-header'>
                                                                {
                                                                    data['has_washed'] == 1 ?
                                                                        <div className='box-icon' title="Has Washed">
                                                                            <img src={"/images/wash.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                                {
                                                                    data['is_favorite'] == 1 ?
                                                                        <div className='box-icon' title="Favorite">
                                                                            <img src={"/images/favorite.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                                {
                                                                    data['is_scheduled'] == 1 ?
                                                                        <div className='box-icon' title="Scheduled to wear every friday">
                                                                            <img src={"/images/scheduled.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                                {
                                                                    data['has_ironed'] == 1 ?
                                                                        <div className='box-icon' title="Has Ironed">
                                                                            <img src={"/images/ironed.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                                {
                                                                    data['is_faded'] == 1 ?
                                                                        <div className='box-icon' title="In Faded">
                                                                            <img src={"/images/faded.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <img src={"/images/"+ctx+".png"}/>
                                                            <div className='box-footer'>
                                                                {data['clothes_qty'] > 1 ? <b style={{fontSize:"var(--textLG)"}}><FontAwesomeIcon icon={faXmark}/>{data['clothes_qty']}</b> : <></>} {data['clothes_name']}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            : 
                            <div key={'no_data_'+ctx} className={`carousel-item py-4 active`}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='box border-0'>
                                            <img src={"/images/empty.png"}/>
                                            <p className='mb-0' style={{fontSize:"var(--textXMD)"}}>No Clothes Found</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {
                    items ?
                        <>
                        <button class="carousel-control-prev" type="button" data-bs-target={"#carouselClothes-"+ctx} data-bs-slide="prev">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target={"#carouselClothes-"+ctx} data-bs-slide="next">
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </button>
                        </>
                    : 
                        <></>
                }
            </div>
        )
    }
}
  