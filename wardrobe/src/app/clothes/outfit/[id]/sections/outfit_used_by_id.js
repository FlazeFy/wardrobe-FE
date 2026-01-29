"use client"
import { convertDatetimeBasedLocal } from "../../../../../modules/helpers/converter"
import React from "react"
import OutfitSectionHardDeleteOutfitHistory from "./outfit_hard_delete_outfit_history"

export default function OutfitSectionUsedById(props) {
    return (
        <div className="mx-4 text-center mx-auto">
            <h2 className="mb-0 fw-bold text-start">Used History</h2>
            <table className="table table-bordered" id="used_history-table">
                <thead>
                    <tr>
                        <th scope="col">Used At</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items ? props.items.map((dt, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{convertDatetimeBasedLocal(dt.created_at)}</td>
                                    <td className='text-center'><OutfitSectionHardDeleteOutfitHistory fetchOutfit={props.fetchOutfit} fetchAllHistory={props.fetchAllHistory} id={dt.id}/></td>
                                </tr>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={2}><div className="my-2"><p className='text-secondary'>- No Used History Found -</p></div></td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
