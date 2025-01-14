"use client"
import AtomsBreakLine from "@/components/atoms/atoms_breakline";
import { getCleanTitleFromCtx } from "@/modules/helpers/converter";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2";
import OrganismsClothesHeader from "../../../../components/organisms/organisms_clothes_header";
import GeneratedSectionConfigurateTemplate from "./generated_configurate_template";

export default function GeneratedSectionRandomOutift() {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        fetchClothesCategoryType()
    },[])

    const fetchClothesCategoryType = () => {
        Swal.showLoading()
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
                    <a className="btn btn-success me-2"><FontAwesomeIcon icon={faDice}/> Generate Now</a>
                    <GeneratedSectionConfigurateTemplate items={items} handleSave={handleSave} handleChange={handleTemplateChange}/>
                </div>
                <AtomsBreakLine length={3}/>
                <div className='row'>
                    {
                        items.map((dt)=>{
                            if(dt.selected){
                                return (
                                    <div className='col-lg-3 col-md-3 col-sm-6 col-6 mx-auto'>
                                        <OrganismsClothesHeader items={dt} type="random"/>
                                    </div>
                                )
                            }
                        })
                    }
                    <div className='col-lg-6 col-md-6 col-sm-12 col-12 text-end pt-2'>
                    </div>
                </div>
            </div>
        );
    }
}
