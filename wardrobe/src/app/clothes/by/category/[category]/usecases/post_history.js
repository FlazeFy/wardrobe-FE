import React from 'react'
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

// Modules
import { getLocal } from '../../../../../../modules/storages/local'
import axios from 'axios'
import { getCookie } from '../../../../../../modules/storages/cookie'

export default function PostHistory({ctx, clothesName, clothesId}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")
    const [clothesNote, setClothesNote] = useState("")
    const [usedContext, setUsedContext] = useState("")
    const [resMsgAll, setResMsgAll] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/dct/used_context`, {
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

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();

            data.append('clothes_id', clothesId);
            data.append('clothes_note', clothesNote);
            data.append('used_context', usedContext);
            
            const response = await axios.post("http://127.0.0.1:8000/api/v1/clothes/history", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenKey}`
                }
            })

            if(response.data.status != 200){
                return response.data.message
            } else {
                window.location.reload()
                return ""
            }
        } catch (error) {
            setResMsgAll(error)
        }
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
            <>
                <button type="button" className="btn btn-primary rounded-pill py-2 px-3 ms-2" data-bs-toggle="modal" data-bs-target={`#${ctx}Modal`}>
                    <FontAwesomeIcon icon={faPlusCircle}/> Use this Clothes
                </button>
                <div className="modal fade" id={`${ctx}Modal`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Use Clothes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-floating">
                                <input type="text" disabled="true" className="form-control" defaultValue={clothesName}></input>
                                <label for="floatingInputGrid">Clothes Name</label>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <a className='btn btn-link'><FontAwesomeIcon icon={faPlus}/> Add More Clothes</a>
                            </div>
                            <div className="form-floating mb-2">
                                <textarea className="form-control" onChange={(e)=>setClothesNote(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                <label for="floatingTextarea2">Notes <span className='text-secondary fw-bold' style={{fontSize:"var(--textMD)"}}>(Optional)</span></label>
                            </div>
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" onChange={(e)=>setUsedContext(e.target.value)} aria-label="Floating label select example">
                                    {
                                        items.map((data, i, idx) => {
                                            return (
                                                <option value={data.dictionary_name}>{data.dictionary_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label for="floatingSelect">Context of Used</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save</button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
  