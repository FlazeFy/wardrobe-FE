"use client"
import { getCookie } from '../../../../../modules/storages/cookie'
import { faFloppyDisk, faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import OrganismsClothesHeader from '../../../../../components/organisms/organisms_clothes_header'
import { getCleanTitleFromCtx } from '../../../../../modules/helpers/converter'

export default function OutfitDetailPostOutfitClothes(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [selectedItem, setSelectedItems] = useState([])
    const [msgAll, setResMsgAll] = useState(null)
    const tokenKey = getCookie("token_key")

    // Dictionaries for select options
    const [usedContextDictionary, setUsedContextDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/header/all/desc`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`,
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                console.log(props.selectedClothes)
                Swal.close()
                setIsLoaded(true)
                setItems(result.data.data)

                if(props.selectedClothes){
                    setSelectedItems(props.selectedClothes)
                }
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"+er,
                })
                setError(error)
            }
        )
    },[])

    // Services
    const handleSubmit = async (e) => {
        try {
            const body = {
                "outfit_id" : props.id,
                "clothes" : clothes,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/outfit/save/clothes", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`,
                    'Content-Type' : 'application/json'
                }
            })
            Swal.close()

            if(response.status === 201){
                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                       props.fetchOutfit()
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                })
                setResMsgAll(response.data.message)
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
            setResMsgAll(error)
        }
    }

    const handleAdd = (dt) => {
        const newClothes = {
            clothes_name : dt.clothes_name,
            clothes_image : dt.clothes_image,
            clothes_type : dt.clothes_type,
            clothes_id : dt.id,
        }

        let found = false 
        selectedItem.forEach((el)=> {
            if(el.clothes_type == dt.clothes_type){
                found = true
            }
        })

        if(!found){
            setSelectedItems([...selectedItem, newClothes])
        } else {
            Swal.fire({
                icon: "warning",
                title: `${getCleanTitleFromCtx(dt.clothes_type)} has been used`,
                text: `Try another clothes type or remove the selected clothes`,
            })
        }
    }

    const handleRemove = (dt) => {
        let newClothes = []
        selectedItem.forEach((el)=> {
            console.log(dt)
            if(el.clothes_id != dt.clothes_id){
                newClothes.push(el)
            }
        })
        setSelectedItems(newClothes)
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <button type="button" className='btn btn-primary w-100' style={{height:"80px"}} data-bs-toggle="modal" data-bs-target="#addHistoryModal">
                    <div className='d-flex justify-content-start text-white text-start'>
                        <FontAwesomeIcon icon={faGears} style={{fontSize:"var(--textXJumbo)"}}/>
                        <div className='ms-3'>
                            <h4 className="mb-0">Manage Clothes</h4>
                            <p className="mb-0">Add & Remove Clothes from Outfit</p>
                        </div>
                    </div>
                </button>
                <div className="modal fade" id="addHistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Manage Clothes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-lg-9 col-md-8 col-sm-12 col-12'>
                                        <h2 className="fw-bold">Available Clothes</h2>
                                        <div className='row'>
                                            {
                                                items.map((dt, idx) => (
                                                    <div key={idx} className='col-lg-4 col-md-6 col-sm-6 col-12'>
                                                        <OrganismsClothesHeader items={dt} type="clothes" handleClick={(e) => handleAdd(dt)}/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className='col-lg-3 col-md-4 col-sm-12 col-12'>
                                        <h2 className="fw-bold">Selected</h2>
                                        {
                                            selectedItem ?
                                                selectedItem.map((dt,idx) => {
                                                    return (
                                                        <div className='d-flex justify-content-start mb-2 box-clothes p-2' onClick={(e) => handleRemove(dt)}>
                                                            <img className='img-profile' src={dt.clothes_image ?? "/images/footwear.png"}></img>
                                                            <div className='ms-2 mt-1'>
                                                                <h6 className='mb-0'>{dt.clothes_name}</h6>
                                                                <p className='mb-0 text-secondary'>{getCleanTitleFromCtx(dt.clothes_type)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            :
                                                <p className='text-secondary'>- No Clothes Selected -</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
