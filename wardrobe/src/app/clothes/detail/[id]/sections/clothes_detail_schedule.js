import { convertDatetimeBasedLocal } from '../../../../../modules/helpers/converter'
import React from 'react'
import HardDeleteSchedule from './hard_delete_schedule'

export default function ClothesDetailSchedule(props) {
    if(props.items){
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Schedule Notes</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.map((dt,idx) => {
                            return (
                                <tr className='text-center'>
                                    <td>{dt.day}</td>
                                    <td>{dt.schedule_note ?? <span className='text-secondary fst-italic'>- No Notes Provided -</span>}</td>
                                    <td>{convertDatetimeBasedLocal(dt.created_at)}</td>
                                    <td className='text-center'><HardDeleteSchedule id={dt.id} fetchClothes={props.fetchClothes}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    } else {
        return <div className="my-2"><p className='text-secondary'>- No Schedule Found -</p></div>
    }
}
  