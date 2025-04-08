"use client"
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { convertDatetimeBasedLocal } from '../../../../modules/helpers/converter'
import { getCookie } from '../../../../modules/storages/cookie'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import UsedHardDeleteUsedHistory from './used_hard_delete_used_history'

export default function UsedAllHistory(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchUsedHistory()
    },[])

    const fetchUsedHistory = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/history/all/desc`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data ? result.data.data :null)  
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        if(items){
            return (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Clothes</th>
                            <th scope="col">Context & Notes</th>
                            <th scope="col">Used At</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((dt,idx) => {
                                return (
                                    <tr key={`detail-used-${idx}`}>
                                        <td>
                                            <p className='mb-1'><b>Name</b> : {dt.clothes_name}</p>
                                            <p className='mb-0' style={{textTransform:"capitalize"}}><b>Type</b> : {dt.clothes_type}</p>
                                        </td>
                                        <td>
                                            <p className='mb-1'><b>Context</b> : {dt.used_context}</p>
                                            {dt.clothes_note ?? <span className='text-secondary fst-italic'>- No Notes Provided -</span>}
                                        </td>
                                        <td>{convertDatetimeBasedLocal(dt.created_at)}</td>
                                        <td className='text-center'><UsedHardDeleteUsedHistory id={dt.id} fetchClothes={fetchUsedHistory}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        } else {
            return <MoleculesNoData title="No Clothes Found"/>
        }
    }
}
  