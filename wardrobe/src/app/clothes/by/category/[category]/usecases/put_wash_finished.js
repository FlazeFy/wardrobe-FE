import React from 'react'
import { useState, useEffect } from "react"
import $ from "jquery"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward } from '@fortawesome/free-solid-svg-icons'

// Modules
import { getLocal } from '../../../../../../modules/storages/local'
import axios from 'axios'
import { getCookie } from '../../../../../../modules/storages/cookie'

export default function PutWashFinished({ctx, clothesId}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState([])
    const [totalFinish, setTotalFinish] = useState(0)
    const tokenKey = getCookie("token_key")

    const [washCheckpoint, setWashCheckpoint] = useState("")
    const [resMsgAll, setResMsgAll] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/wash_checkpoint/${clothesId}`, {
            headers: {
                Authorization: `Bearer ${tokenKey}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItem(result.data)    
                setTotalFinish(result.data.wash_checkpoint.filter(cp => cp.is_finished).length)
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItem(JSON.parse(getLocal(ctx + "_sess")))
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
            const data = {
                wash_checkpoint: washCheckpoint,
            };

            const response = await axios.put(`http://127.0.0.1:8000/api/v1/clothes/update_checkpoint/${clothesId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
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

    function setCheckpoint(){
        let holder = []

        $(document).ready(function() {
            let total = 0
            $('.checkpoint-wash').each(function(index) {
                if($(this).prop('checked')){
                    total++
                }

                holder.push({
                    id: $('.checkpoint-wash-id').eq(index).val(),
                    checkpoint_name: $(this).val(),
                    is_finished: $(this).prop('checked')
                })
            });

            setWashCheckpoint(JSON.stringify(holder))
            setTotalFinish(total)
        });
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
        const checkpoint = item['wash_checkpoint']

        return (
            <>
                <button type="button" className="btn btn-success rounded-pill py-2 px-3 ms-2" data-bs-toggle="modal" data-bs-target={`#${ctx}Modal`}>
                    <FontAwesomeIcon icon={faForward}/> Update Status
                </button>
                <div className="modal fade" id={`${ctx}Modal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Washing Status</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Notes</h6>
                            <p>{item['wash_note'] ?? <span className='text-secondary'>- No Notes -</span>}</p>
                            <h6>Checkpoint</h6>
                            {
                                checkpoint.map((data, i, idx) => {
                                    return (
                                        <div className="form-check">
                                            <input className="checkpoint-wash-id" value={data['id']} hidden></input>
                                            <input className="form-check-input checkpoint-wash" type="checkbox" value={data['checkpoint_name']} id="flexCheckDefault" defaultChecked={data['is_finished']}
                                                onChange={setCheckpoint}></input>
                                            <label className="form-check-label" for="flexCheckDefault">{data['checkpoint_name']}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" id={`submit_${ctx}_btn`} onClick={handleSubmit}>
                                ({totalFinish}/{checkpoint.length}) Update Checkpoint
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
  