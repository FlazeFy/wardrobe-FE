"use client"
import AtomsBreakLine from "../../../..//components/atoms/atoms_breakline";
import { getCleanTitleFromCtx } from "../../../../modules/helpers/converter";
import { faDice, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";
import OrganismsClothesHeader from "../../../../components/organisms/organisms_clothes_header";
import GeneratedSectionConfigurateTemplate from "./generated_configurate_template";
import GeneratedSectionSaveOutfit from "./generated_save_outfit";
import Axios from 'axios'
import { getLocal, storeLocal } from "../../../..//modules/storages/local";

export default function GeneratedSectionRandomOutift() {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [isGenerated, setIsGenerated] =  useState(false)
    const saveOutfitRef = useRef(null)

    useEffect(() => {
        fetchClothesCategoryType()
    },[])

    const fetchClothesCategoryType = () => {
        Swal.showLoading()

        const localHistory = getLocal('generated_outfit_history')
        if (localHistory) {
            setIsGenerated(true)
        } 
        
        fetch(`http://127.0.0.1:8000/api/v1/dct/clothes/category_type`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                const data = result.data
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
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
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
            })
        }
    }

    // Service
    const handleSubmit = async (e) => {
        try {
            const body = {
                "clothes_type" : "hat,shirt",
            }

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/generate/outfit", JSON.stringify(body), {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`,
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
                })
            }
        } catch (error) {
            Swal.close()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            })
        }
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className="mx-4 text-center mx-auto" style={{maxWidth:"1080px"}}>
                <h1 className="mb-3" style={{fontSize:"74px", fontWeight:"800"}}>Generate Outfit?</h1>
                <h5 className="mb-4 text-secondary">Are You Confused With Your Messy Closet? Confused About What To Wear Today? Or You Just Forgot What Clothes That Have Been Ironed Or Are Still In The Laundry?</h5>
                <h5 className="mb-4 text-secondary">Stay Calm, We Can Set What You Will Wear Today, Tommorow, or Whatever Day You Want. We Will Analyze Through Your Inventory, Based On Your History, And Behavior</h5>
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
                            items.map((dt) => {
                                if (dt.selected) {
                                    return (
                                        <div className='col-lg-3 col-md-3 col-sm-6 col-6 mx-auto' key={dt.clothes_type}>
                                            <OrganismsClothesHeader items={dt} type="random"/>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        ) : (
                            <div className="my-2"><p className='text-secondary'>- No Active Template -</p></div>
                        )
                    }
                </div>
            </div>
        );
    }
}
