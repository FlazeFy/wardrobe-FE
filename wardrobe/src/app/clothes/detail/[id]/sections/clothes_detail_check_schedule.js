import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ClothesDetailCheckSchedule(props) {
    if(props.items){
        const today = new Date()
        const dayName = today.toLocaleString('en-US', { weekday: 'short' })
        const is_found = props.items.filter(el => el.day === dayName).length > 0
        
        if(is_found){
            return (
                <div className='alert alert-primary' role='alert'>
                    <h4><FontAwesomeIcon icon={faCircleInfo}/> Information</h4>
                    <p className="mb-0">Don't forget, This clothes is set to wear today!</p>
                </div>
            )
        } else {
            return <></>
        }
    } else {
        return <></>
    }
}
  