"use client"
import { convertDatetimeBasedLocal } from "../../../../../modules/helpers/converter";
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../../../components/molecules/molecules_alert_box";
import { getCookie } from "../../../../../modules/storages/cookie";
import OutfitSectionHardDeleteOutfitHistory from "./outfit_hard_delete_outfit_history";

export default function OutfitSectionUsedById(props) {
    // Initial variables
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState()
    const [maxPage, setMaxPage] = useState(0)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchAllHistory()
    }, [])

    const fetchAllHistory = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/${props.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenKey}`, 
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then((result) => {
            Swal.close()
            setIsLoaded(true)
            setItems(result.data.data)
            setMaxPage(result.data.last_page)
        })
        .catch((error) => {
            Swal.close()
            if (error.message != 404) {
                setError(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                });
            } else {
                setIsLoaded(true)
            }
        });
    };    

    if (error) {
        return <MoleculesAlertBox message={error.message} type="danger" context={props.ctx} />
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className="text-center text-white mt-2 fst-italic">Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className="mx-4 text-center mx-auto">
                <h2 className="mb-0 fw-bold text-start">Used History</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Used At</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items ? items.map((dt) => {
                                return (
                                    <tr>
                                        <td>{convertDatetimeBasedLocal(dt.created_at)}</td>
                                        <td className='text-center'><OutfitSectionHardDeleteOutfitHistory fetchOutfit={props.fetchOutfit} fetchAllHistory={fetchAllHistory} id={dt.id}/></td>
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
}
