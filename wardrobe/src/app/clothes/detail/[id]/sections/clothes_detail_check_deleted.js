import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ClothesDetailCheckDeleted(props) {
    if(props.items){
        return (
            <div className='alert alert-danger' role='alert'>
                <h4><FontAwesomeIcon icon={faTriangleExclamation}/> Warning</h4>
                <p className="mb-0">This clothes has been deleted</p>
            </div>
        )
    } else {
        return <></>
    }
}
  