"use client"
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { convertDatetimeBasedLocal } from '../../../../modules/helpers/converter'
import { getLocal } from '../../../../modules/storages/local'
import React, { useEffect, useState } from 'react'
import UsedHardDeleteUsedHistory from './used_hard_delete_used_history'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import { fetchUsedHistory } from '@/modules/repositories/clothes_repository'

export default function UsedAllHistory(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getLocal("token_key")

    useEffect(() => {
        fetchUsedHistory(
            (result) => {
                setIsLoaded(true)
                setItems(result ? result.data :null)  
            }, 
            (error) => {
                setError(error)
            }, tokenKey)
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        if(items){
            return (
                <table className="table table-bordered" id="used_history-table">
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
  