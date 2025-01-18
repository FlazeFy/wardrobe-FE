"use client"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import Swal from "sweetalert2";
import Axios from 'axios'
import { getLocal } from "../../../../modules/storages/local";
import { getCookie } from "../../../../modules/storages/cookie";

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
                    const data = JSON.parse(getLocal('generated_outfit_history'))
                    const body = {
                        'list_outfit' : data
                    }

                    let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/save`, JSON.stringify(body), {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenKey}`,
                        }
                    })
                    
                    Swal.hideLoading()
                    if(response.status === 201){
                        Swal.fire({
                            title: "Success!",
                            text: response.data.message,
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.removeItem('generated_outfit_history')
                            }
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        })
                    }
                } catch (error) {
                    Swal.hideLoading()
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                }
            } 
        })
    }

    return (
        <>
            <a className="btn btn-success" onClick={saveAllLocalGenerated}><FontAwesomeIcon icon={faFloppyDisk}/> Save All</a>
        </>
    );
}
