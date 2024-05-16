"use client"
import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import { getLocal } from '@/modules/storages/local'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import PostHistory from './usecases/post_history'
import GetClotchesBySimiliar from './usecases/get_clothes_by_similiar'

export default function CategoryPage({ params }) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [selectedClothesName, setSelectedClothesName] = useState(null)
    const [selectedClothesId, setSelectedClothesId] = useState(null)

    const [selectedClothesMerk, setSelectedClothesMerk] = useState(null)
    const [selectedClothesMade, setSelectedClothesMade] = useState(null)
    const [selectedClothesType, setSelectedClothesType] = useState(null)
    const [allDetailsSet, setAllDetailsSet] = useState(false)

    const [errorHistory, setErrorHistory] = useState(null)
    const [isLoadedHistory, setIsLoadedHistory] = useState(false)
    const [itemsHistory, setItemsHistory] = useState([])
    const keyToken = '76|HkWAJH66qssjePsFpldCJEg4pXTGE7tifRTClkkK92bcec9f'

    useEffect(() => {
        //Default config
        const keyOrder = getLocal("get_"+params.category)

        if(keyOrder === null){
            storeLocal("get_"+params.category,"DESC")
        }
        
        fetch(`http://127.0.0.1:8000/api/v1/clothes/detail/${params.category}/${keyOrder}`, {
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
                if(getLocal(params.category + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(params.category + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    function showDetail(data){
        let holder = document.getElementById('detail-clothes')
        const colors = data.clothes_color.split(", ")

        setSelectedClothesName(data.clothes_name)
        setSelectedClothesId(data.id)
        setSelectedClothesMerk(data.clothes_merk)
        setSelectedClothesMade(data.clothes_made_from)
        setSelectedClothesType(data.clothes_type)

        setAllDetailsSet(true);

        holder.innerHTML = `
            <img src=${"/images/"+params.category+".png"}/>
            <h3>${data.clothes_name} 
                <span style="font-size:var(--textXLG);" class="bg-dark rounded-pill mx-2 px-3 py-1 text-white">${data.clothes_size}</span>
            </h3>
            <div class="d-flex justify-content-center mb-3">
                <span style="font-size:var(--textXLG);" class="bg-dark rounded-pill mx-2 px-3 py-1 text-white">${data.clothes_merk}</span>
                <span style="font-size:var(--textXLG);" class="bg-dark rounded-pill mx-2 px-3 py-1 text-white">${data.clothes_made_from}</span>
                <span style="font-size:var(--textXLG);" class="bg-dark rounded-pill mx-2 px-3 py-1 text-white">${data.clothes_type}</span>
            </div>
            <p>${data.clothes_desc ?? '<span class="fst-italic text-secondary">- No Description -</span>'}</p>
            
            <hr>
            <h5 class="text-start">Detail</h5>
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <h6>Price</h6>
                    <p>Rp. ${data.clothes_price}</p>
                </div>
                <div>
                    <h6>Qty</h6>
                    <p>${data.clothes_qty}</p>
                </div>
                <div>
                    <h6>Main Color</h6>
                    ${colors.map(color => `
                            <span style="font-size:var(--textXLG);" class="bg-dark rounded-pill mx-2 px-3 py-1 text-white">${color}</span>
                        `).join('')}
                </div>
            </div>

            <hr>
            <h5 class="text-start">Properties</h5>
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <h6>Created At</h6>
                    <p>${data.created_at}</p>
                </div>
                <div>
                    <h6>Updated At</h6>
                    <p>-</p>
                </div>
                <div>
                    <h6>Last Used At</h6>
                    <p>-</p>
                </div>
            </div>
        `
        get_history(data.id)
    }

    function get_history(id){
        fetch(`http://127.0.0.1:8000/api/v1/clothes/history/${id}/desc`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoadedHistory(true)
                setItemsHistory(result.data)        
            },
            (error) => {
                if(getLocal(params.category + "_sess") !== undefined){
                    setIsLoadedHistory(true)
                    setItemsHistory(JSON.parse(getLocal(params.category + "_sess")))
                } else {
                    setIsLoadedHistory(true)
                    setErrorHistory(error)
                }
            }
        )
    }

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
            <div className="content-grid">
                <h2>Clothes / {getCleanTitleFromCtx(params.category)}</h2><br></br>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            {
                                items.map((data, i, idx) => {
                                    return (
                                        <div key={idx} className='col-4'>
                                            <div className='box' onClick={(e)=>showDetail(data)}>
                                                <img src={"/images/"+params.category+".png"}/>
                                                <div className='box-footer'>
                                                    {data['clothes_qty'] > 1 ? <b style={{fontSize:"var(--textLG)"}}><FontAwesomeIcon icon={faXmark}/>{data['clothes_qty']}</b> : <></>} {data['clothes_name']}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col text-start'>
                        <a className='btn btn-danger text-white rounded-pill py-2 px-3' href='/home'><FontAwesomeIcon icon={faArrowCircleLeft}/> Back</a>
                        {
                            selectedClothesName ?
                                <PostHistory ctx="post_history" clothesName={selectedClothesName} clothesId={selectedClothesId}/> 
                            :
                                <></>
                        }
                        <div id="detail-clothes" className='text-center'></div>
                        <hr></hr><div className="mb-3 text-start">
                            <h5>History</h5>
                            <div id="history_holder"></div>
                        </div>
                        {
                            itemsHistory != null && itemsHistory.length > 0 ?
                                itemsHistory.map((data, i, idx) => {
                                    return (
                                        <div key={idx} className='mb-2'>
                                            <p className='mb-0'>{i+1}. Used for <b>{data.used_context}</b> {data.created_at}</p>
                                            <a>Notes : {data.clothes_note ?? '-'}</a>
                                        </div>
                                    )
                                })
                            :
                                <p className='text-secondary'>No history found!</p>
                        }
                        {
                            selectedClothesMerk && selectedClothesMade && selectedClothesType && (
                                <>
                                    <h5>See Others ...</h5>
                                    <GetClotchesBySimiliar ctx={"clothes_merk"} val={selectedClothesMerk} exc={selectedClothesId}/>
                                    <hr></hr>
                                    <h5>See Others ...</h5>
                                    <GetClotchesBySimiliar ctx={"clothes_made_from"} val={selectedClothesMade} exc={selectedClothesId}/>
                                    <hr></hr>
                                    <h5>See Others ...</h5>
                                    <GetClotchesBySimiliar ctx={"clothes_type"} val={selectedClothesType} exc={selectedClothesId}/>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}