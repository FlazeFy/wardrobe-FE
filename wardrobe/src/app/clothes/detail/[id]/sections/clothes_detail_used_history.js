"use client"
import React from 'react'
import HardDeleteClothesUsedById from './hard_delete_clothes_used_by_id'

export default function ClothesDetailUsedHistory(props) {
    if(props.items){
        return (
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Context</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Used At</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map((dt,idx) => {
                            return (
                                <tr>
                                    <td className='text-center'>{dt.used_context}</td>
                                    <td>{dt.clothes_note ?? <span className='text-secondary fst-italic'>- No Notes Provided -</span>}</td>
                                    <td>{dt.created_at}</td>
                                    <td className='text-center'><HardDeleteClothesUsedById id={dt.id} fetchClothes={props.fetchClothes}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    } else {
        return <div class="my-2"><p className='text-secondary'>- No Used History Found -</p></div>
    }
}
  