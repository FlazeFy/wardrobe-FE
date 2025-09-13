"use client"
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline";
import { getCleanTitleFromCtx, getErrorValidation } from "../../../../modules/helpers/converter";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";
import OrganismsClothesHeader from "../../../../components/organisms/organisms_clothes_header";
import GeneratedSectionConfigurateTemplate from "./generated_configurate_template";
import GeneratedSectionSaveOutfit from "./generated_save_outfit";
import Axios from 'axios'
import { getLocal, storeLocal } from "../../../..//modules/storages/local";
import { getCookie } from "../../../../modules/storages/cookie";
import { messageError } from '@/modules/helpers/message';

export default function GeneratedSectionRandomOutift(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [isGenerated, setIsGenerated] =  useState(false)
    const saveOutfitRef = useRef(null)
    const tokenKey = getCookie("token_key")
    const now = new Date()

    useEffect(() => {
        Swal.showLoading()
        fetchClothesCategoryType()
    },[])

    const fetchClothesCategoryType = () => {
        const localHistory = getLocal('generated_outfit_history')
        if (localHistory) {
            setIsGenerated(true)
        } 

        const oldTimeHit = getLocal('last_hit-dct_category_type')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            let final_data = []
            data.forEach(el => {
                final_data.push({
                    clothes_image: null,
                    clothes_category: getCleanTitleFromCtx(el.clothes_category),
                    clothes_type: el.clothes_type,
                    selected: false,
                })
            });
            setItems(final_data)  
        }
    
        if (timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('dct_category_type'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/dct/clothes/category_type`, {
                headers: {
                    'Authorization': `Bearer ${tokenKey}`,
                },
            })
            .then(res => res.json())
                .then(
                (result) => {
                    Swal.close()
                    setIsLoaded(true)
                    fetchData(result.data)
                    storeLocal('dct_category_type', JSON.stringify(result.data))
                    storeLocal('last_hit-dct_category_type', JSON.stringify(now)) 
                },
                (error) => {
                    messageError(error)
                    setError(error)
                }
            )
        }
    }

    const handleTemplateChange = (clothesType, isSelected) => {
        setItems((prevTemplate) =>
            prevTemplate.map((item) =>
                item.clothes_type === clothesType ? { ...item, selected: isSelected } : item
            )
        )
    }

    const handleSave = (updatedTemplate) => {
        setItems(updatedTemplate)
    }

    const handleGenerate = () => {
        Swal.showLoading()
        if(items.length > 0 && items.some(dt => dt.selected)){
            handleSubmit()
            setIsGenerated(true)
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Outfit Generated",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                    saveOutfitRef.current.fetchLocalHistory()
                }
            })
        } else {
            Swal.close()
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "You must selected at least one Clothes Type for the template",
                confirmButtonText: "Okay!"
            })
        }
    }

    // Repositories
    const handleSubmit = async (e) => {
        try {
            let clothes_type = ''
            items.forEach((dt, idx) => {
                if(dt.selected){
                    if(idx < items.length - 1){
                        clothes_type += `${dt.clothes_type},`
                    } else {
                        clothes_type += dt.clothes_type
                    }
                }
            })

            const body = {
                "clothes_type" : clothes_type,
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/outfit/generate", JSON.stringify(body), {
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
                    confirmButtonText: "Okay!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.close()
                        const data = response.data.data
                        const now = new Date()
                        const formattedDate = `${now.getDate()}-${now.toLocaleString('default', { month: 'short' })}-${now.getFullYear()}`
                        const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

                        const localHistory = {
                            data: data,
                            created_at: now,
                            outfit_name: `Outfit Generated ${formattedDate} ${formattedTime}`
                        }

                        const oldLocalHistory = getLocal('generated_outfit_history')
                        let finalLocalHistory = []
                        if(oldLocalHistory){
                            const parsedOldLocalHistory = JSON.parse(oldLocalHistory)
                            finalLocalHistory = [...parsedOldLocalHistory]
                        }
                        finalLocalHistory.push(localHistory)

                        localStorage.removeItem('generated_outfit_history')
                        storeLocal('generated_outfit_history',JSON.stringify(finalLocalHistory))
                        let final_data = []
                        data.forEach(el => {
                            final_data.push({
                                clothes_image: null,
                                clothes_category: el.clothes_name,
                                clothes_type: el.clothes_type,
                                selected: true,
                            })
                        })
                        setItems(final_data)  
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                    confirmButtonText: "Okay!"
                })
            }
        } catch (error) {
            Swal.close()
            const msg = getErrorValidation(error.response.data.message)
            
            if (error.response && (error.response.status === 422)) {
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: msg,
                    confirmButtonText: "Okay!"
                });
    
                setResMsgAll(msg)
            } else {
                messageError(error)
                setResMsgAll(error)
            }
        }
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="container-generator mx-auto text-center d-block" style={{maxWidth:"1280px", textAlign:"center"}}>
                <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Generate <span className="text-main">Outfit</span>?</h1>
                <h5 className="mb-4">Are You Confused With Your Messy Closet? Confused About What To Wear Today? Or You Just Forgot What Clothes That Have Been Ironed Or Are Still In The Laundry?</h5>
                <h5 className="mb-4">Stay Calm, We Can Set What You Will Wear Today, Tommorow, or Whatever Day You Want. We Will Analyze Through Your Inventory, Based On Your History, And Behavior</h5>
                <div className="d-inline my-2">
                    <a className="btn btn-success me-2" onClick={handleGenerate}><FontAwesomeIcon icon={faDice}/> Generate Now</a>
                    <GeneratedSectionConfigurateTemplate items={items} handleSave={handleSave} handleChange={handleTemplateChange}/>
                    {
                        isGenerated && <GeneratedSectionSaveOutfit ref={saveOutfitRef}/>
                    }
                </div>
                <AtomsBreakLine length={3}/>
                <div className='row'>
                    {
                        items.length > 0 && items.some(dt => dt.selected) ? (
                            items.map((dt,idx) => {
                                if (dt.selected) {
                                    return (
                                        <div className='col-lg-2 col-md-3 col-sm-4 col-6 mx-auto' key={idx}>
                                            <OrganismsClothesHeader items={dt} type="random"/>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <div className="my-2"><p>- No Active Template -</p></div>
                        )
                    }
                </div>
            </div>
        );
    }
}
