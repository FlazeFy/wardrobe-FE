"use client"
import MoleculesAlertBox from "../../../../../components/molecules/molecules_alert_box"
import { convertDatetimeBasedLocal } from "../../../../../modules/helpers/converter"
import { faCheck, faFire, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useImperativeHandle, useState, forwardRef, useRef } from "react"
import Swal from "sweetalert2"
import { getLocal, storeLocal } from "../../../../../modules/storages/local"
import GeneratedSectionSaveLocalGenerated from "./generated_save_local_generated"

const GeneratedSectionSaveOutfit = forwardRef((props, ref) => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useImperativeHandle(ref, () => ({
        fetchLocalHistory
    }))

    useEffect(() => {
        fetchLocalHistory()

        const modalElement = document.getElementById("saveOutfitModal")
        if (modalElement) modalElement.addEventListener("shown.bs.modal", fetchLocalHistory)

        return () => {
            if (modalElement) modalElement.removeEventListener("shown.bs.modal", fetchLocalHistory)
        }
    }, [])

    const fetchLocalHistory = () => {
        try {
            Swal.showLoading()
            const localHistory = getLocal('generated_outfit_history')
            localHistory ? setItems(JSON.parse(localHistory)) : setItems([])
            setIsLoaded(true)
            Swal.close()
        } catch (err) {
            setError(err)
            Swal.close()
        }
    }

    const resetHistory = () => {
        localStorage.removeItem('generated_outfit_history')
        fetchLocalHistory()
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Generated outfit has been reset",
            confirmButtonText: "Okay!"
        })
    }

    const removeClothes = (idx, id) => {
        Swal.showLoading()
        let localHistory = JSON.parse(getLocal('generated_outfit_history'))
        let msg = ''
    
        if (localHistory[idx].data.length === 1) {
            localHistory.splice(idx, 1)
            msg = "Generated outfit has been reset"
        } else {
            localHistory[idx].data = localHistory[idx].data.filter(dt => dt.id !== id)
            msg = "Clothes has been removed"
        }
    
        localHistory.length > 0 ? storeLocal('generated_outfit_history', JSON.stringify(localHistory)) : localStorage.removeItem('generated_outfit_history')
        fetchLocalHistory()
    
        Swal.fire({
            icon: "success",
            title: "Success",
            text: msg,
            confirmButtonText: "Okay!"
        })
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <>
                <a className="btn btn-success ms-2" data-bs-target="#saveOutfitModal" data-bs-toggle="modal"> <FontAwesomeIcon icon={faFloppyDisk}/> Save Outfit</a>
                <div className="modal fade" id="saveOutfitModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Save Generated Outfit</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    items.map((dt, index) => (
                                        <div key={index} style={{ borderBottom: "1.5px solid #ccc" }} className="mb-2">
                                            <div className="text-start">
                                                <h5 className="mb-0 text-start">{dt.outfit_name}</h5>
                                                <p className="text-secondary">Generated at {convertDatetimeBasedLocal(dt.created_at)}</p>
                                            </div>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Clothes Name</th>
                                                        <th>Type</th>
                                                        <th>Merk</th>
                                                        <th>Made From</th>
                                                        <th>Color</th>
                                                        <th>Last Used</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dt.data.map((clothes, i) => (
                                                            <tr key={i}>
                                                                <td>{clothes.clothes_name}</td>
                                                                <td style={{textTransform:"capitalize"}}>{clothes.clothes_type}</td>
                                                                <td style={{textTransform:"capitalize"}}>{clothes.clothes_merk}</td>
                                                                <td style={{textTransform:"capitalize"}}>{clothes.clothes_made_from}</td>
                                                                <td style={{textTransform:"capitalize"}}>{clothes.clothes_color}</td>
                                                                <td>{clothes.last_used ? convertDatetimeBasedLocal(clothes.last_used) :'-'}</td>
                                                                <td>
                                                                    <a className="btn btn-danger" onClick={(e) => removeClothes(index, clothes.id)}><FontAwesomeIcon icon={faTrash}/></a>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="me-2">
                                    <a className="btn btn-primary"><FontAwesomeIcon icon={faCheck}/> Validate Existing</a>
                                </div>
                                <div>
                                    <a className="btn btn-danger me-2" onClick={resetHistory}><FontAwesomeIcon icon={faFire}/> Reset History</a>
                                    <GeneratedSectionSaveLocalGenerated/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})

GeneratedSectionSaveOutfit.displayName = "GeneratedSectionSaveOutfit"

export default function GeneratedSectionRandomOutift() {
    const saveOutfitRef = useRef(null)

    const handleGenerate = () => {
        Swal.showLoading()
        setTimeout(() => {
            Swal.close()
            Swal.fire({
                title: "Generated!",
                icon: "success",
                confirmButtonText: "Okay!"
            }).then(() => {
                saveOutfitRef.current.fetchLocalHistory()
            })
        }, 1000)
    }

    return <GeneratedSectionSaveOutfit onClick={handleGenerate} ref={saveOutfitRef}/>
}