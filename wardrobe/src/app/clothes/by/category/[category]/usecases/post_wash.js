import React from 'react'
import { useState, useEffect } from "react"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faHandsBubbles, faPlus } from '@fortawesome/free-solid-svg-icons'

// Modules
import { getLocal } from '../../../../../../modules/storages/local'
import axios from 'axios'
import { getCookie } from '../../../../../../modules/storages/cookie'

export default function PostWash({ctx, clothesName, clothesId}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [checkpoints, setCheckpoints] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const tokenKey = getCookie("token_key")
    const [resMsgAll, setResMsgAll] = useState(null)

    const [washType, setWashType] = useState(null)
    const [washNote, setWashNote] = useState(null)
    const [washCheckpoint, setWashCheckpoint] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/dct/wash_type`, {
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

    const addCheckpoint = () => {
        const idx = checkpoints.length+1
        setCheckpoints([...checkpoints, {
            id: idx,
            checkpoint_name: `To Do ${idx}`,
            is_finished: false
        }])
    }

    const validateCheckpoint = (e, index) => {
        const value = e.target.value;
        if (value.trim() === '') {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                setCheckpoints(prev => prev.filter((_, i) => i !== index));
            }
        } else {
            setCheckpoints(prev => prev.map((checkpoint, i) => i === index ? { ...checkpoint, checkpoint_name: value } : checkpoint));
        }
        setWashCheckpoint(checkpoints)
    }

    const handleCheckboxChange = (index) => {
        setCheckpoints(prev => prev.map((checkpoint, i) => i === index ? { ...checkpoint, is_finished: !checkpoint.is_finished } : checkpoint));
    }

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();

            data.append('clothes_id', clothesId)
            data.append('wash_note', washNote)
            data.append('wash_type', washType)
            data.append('wash_checkpoint', JSON.stringify(washCheckpoint))
            
            const response = await axios.post("http://127.0.0.1:8000/api/v1/clothes/wash", data, {
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
                <button type="button" className="btn btn-success rounded-pill py-2 px-3 ms-2" data-bs-toggle="modal" data-bs-target={`#${ctx}Modal`}>
                    <FontAwesomeIcon icon={faHandsBubbles}/> Wash this Clothes
                </button>
                <div className="modal fade" id={`${ctx}Modal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Wash Clothes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='mb-1'>
                            <div className="form-floating">
                                <input type="text" disabled="true" className="form-control" defaultValue={clothesName}></input>
                                <label for="floatingInputGrid">Clothes Name</label>
                            </div>
                            {checkpoints.map((checkpoint, index) => (
                                    index == 0 ?
                                        <>
                                            <label className='mt-2'>Checkpoint to Achieve</label>
                                            <div className="form-check mb-1" key={index}>
                                                <input className="form-check-input mt-2" type="checkbox" defaultChecked={checkpoint.is_finished} id={`checkpoint${index}`} 
                                                    onChange={handleCheckboxChange} />
                                                <input type="text" className='form-control' defaultValue={checkpoint.checkpoint_name} 
                                                    onInput={(e) => validateCheckpoint(e, index)} 
                                                    onKeyDown={(e) => validateCheckpoint(e, index)}></input>
                                            </div>
                                        </>
                                    :
                                        <div className="form-check mb-2" key={index}>
                                            <input className="form-check-input mt-2" type="checkbox" defaultChecked={checkpoint.is_finished} id={`checkpoint${index}`} 
                                                onChange={handleCheckboxChange} />
                                            <input type="text" className='form-control' defaultValue={checkpoint.checkpoint_name} 
                                                onInput={(e) => validateCheckpoint(e, index)} 
                                                onKeyDown={(e) => validateCheckpoint(e, index)}></input>
                                        </div>
                                ))}
                            </div>
                            <div className='d-flex justify-content-end'>
                                <a className='btn btn-link' onClick={addCheckpoint}><FontAwesomeIcon icon={faPlus}/> Add Checkpoint</a>
                                <a className='btn btn-link'><FontAwesomeIcon icon={faPlus}/> Add More Clothes</a>
                            </div>
                            <div className="form-floating mb-2">
                                <textarea className="form-control" onChange={(e)=>setWashNote(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                <label for="floatingTextarea2">Notes <span className='text-secondary fw-bold' style={{fontSize:"var(--textMD)"}}>(Optional)</span></label>
                            </div>
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" onChange={(e)=>setWashType(e.target.value)} aria-label="Floating label select example">
                                    {
                                        items.map((data, i, idx) => {
                                            return (
                                                <option value={data.dictionary_name}>{data.dictionary_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <label for="floatingSelect">Type</label>
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
  