"use client"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Swal from "sweetalert2"
import { getLocal } from "../../../../modules/storages/local"
import { postSaveOutfit } from "../../../../modules/repositories/outfit_repository"
import { messageError } from "@/modules/helpers/message"

export default function GeneratedSectionSaveLocalGenerated(props) {
    const tokenKey = getLocal("token_key")

    const saveAllLocalGenerated = () => {
        Swal.fire({
            title: "Are you sure?",
            text: `Want to save all generated outfit?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Save it!",
            cancelButtonText: "No, Cancel!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.showLoading()
                try {
                    postSaveOutfit(tokenKey)
                } catch (error) {
                    messageError(error)
                }
            } 
        })
    }

    return <a className="btn btn-success" onClick={saveAllLocalGenerated}><FontAwesomeIcon icon={faFloppyDisk}/> Save All</a>
}
