import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getLocal } from '../../../../../../modules/storages/local'
import { getCookie } from '../../../../../../modules/storages/cookie'

export default function GetClotchesBySimiliar({ctx,val,exc}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/similiar/${ctx}/${val}/${exc}`, {
            headers: {
                Authorization: `Bearer ${tokenKey}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
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
                <div id={"carouselClothesSimiliar-"+ctx} className="carousel slide" data-bs-ride="carousel">
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
                                                                    data['is_favorite'] == 1 ?
                                                                        <div className='box-icon' title="Favorite">
                                                                            <img src={"/images/favorite.png"}/>
                                                                        </div>
                                                                    :
                                                                        <></>
                                                                }
                                                            </div>
                                                            <img src={"/images/footwear.png"}/>
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
                        <button className="carousel-control-prev" type="button" data-bs-target={"#carouselClothesSimiliar-"+ctx} data-bs-slide="prev">
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={"#carouselClothesSimiliar-"+ctx} data-bs-slide="next">
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
  