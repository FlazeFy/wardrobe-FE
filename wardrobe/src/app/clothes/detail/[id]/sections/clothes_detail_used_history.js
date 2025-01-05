"use client"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ClothesDetailUsedHistory(props) {
    return (
        <div className=''>
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
                                    <td className='text-center'><a className='btn btn-danger'><FontAwesomeIcon icon={faTrash}/></a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
  