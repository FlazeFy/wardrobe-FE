"use client"

import MoleculesField from '../../../components/molecules/molecules_field'
import React, { useState } from 'react'

export default function RegisterSectionTNC() {
    const [tnc, setTNC] = useState(false)

    return (
        <div>
            <h1 className="mb-0 fw-bold">Terms & Condition</h1>
            <h4 className="text-secondary">Please read this terms & condition before you go to the next steps</h4>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Tempus duis aliquam montes vulputate ex eleifend ridiculus. Ante aptent volutpat natoque tincidunt suscipit habitasse mauris. Tempus tempor amet erat, ipsum elit accumsan facilisis quis. Consequat dapibus posuere cubilia duis netus. Interdum laoreet pulvinar praesent felis rhoncus. Faucibus suspendisse vitae, dictum diam ipsum hac. Metus aptent feugiat gravida ad fermentum nunc nam quam.
                Accumsan rhoncus adipiscing nostra et nunc. Elit pulvinar nullam posuere nibh duis luctus taciti volutpat. Ante vestibulum sollicitudin orci eleifend vel, tortor efficitur. Gravida eros aliquet auctor per euismod massa class elit bibendum. Rutrum montes adipiscing condimentum ullamcorper arcu. Mi dolor aptent ornare posuere enim. Neque ut per aliquam mollis dis. Finibus aliquet nostra litora praesent vitae scelerisque pulvinar. Proin scelerisque tristique porttitor nam scelerisque justo cursus.</p>
            <MoleculesField title="I Agree" type={'checkbox'} defaultValue={tnc} handleChange={(e) => {
                setTNC(e.target.value)
            }}/>
        </div>
    )
}
  