"use client"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import Swal from "sweetalert2";
import { getCookie } from "../../../../modules/storages/cookie";
import { postSaveOutfit } from "@/modules/api/outfit/service";

export default function GeneratedSectionSaveLocalGenerated(props) {
    const tokenKey = getCookie("token_key")

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
                    Swal.hideLoading()
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        confirmButtonText: "Okay!"
                    })
                }
            } 
        })
    }

    return <a className="btn btn-success" onClick={saveAllLocalGenerated}><FontAwesomeIcon icon={faFloppyDisk}/> Save All</a>
}
