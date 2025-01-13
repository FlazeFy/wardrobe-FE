"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import MoleculesField from '../../../components/molecules/molecules_field'

export default function ProfileSectionEditForm(props) {
    const [username, setUsername] = useState(props.item.username)
    const [email, setEmail] = useState(props.item.email)
    const [telegramUserId, setTelegramUserId] = useState(props.item.telegram_user_id)
    const [telegramIsValid, setTelegramIsValid] = useState(props.item.telegram_is_valid)

    return (
        <div>
            <MoleculesField title="Username" type={'text'} defaultValue={username} handleChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <MoleculesField title="Email" type={'text'} defaultValue={email} handleChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <MoleculesField title="Telegram User ID" type={'text'} defaultValue={telegramUserId} handleChange={(e) => {
                setTelegramUserId(e.target.value)
            }}/>
            <button className='btn btn-success mt-3'><FontAwesomeIcon icon={faFloppyDisk}/> Save Changes</button>
        </div>
    )
}
  