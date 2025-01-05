"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'

export default function ClothesDetailEditForm(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    const [clothesName, setClothesName] = useState(props.item.clothes_name)
    const [clothesDesc, setClothesDesc] = useState(props.item.clothes_desc)
    const [clothesMerk, setClothesMerk] = useState(props.item.clothes_merk)
    const [clothesSize, setClothesSize] = useState(props.item.clothes_size)
    const [clothesGender, setClothesGender] = useState(props.item.clothes_gender)
    const [clothesMadeFrom, setClothesMadeFrom] = useState(props.item.clothes_made_from)
    const [clothesColor, setClothesColor] = useState(props.item.clothes_color)
    const [clothesCategory, setClothesCategory] = useState(props.item.clothes_category)
    const [clothesType, setClothesType] = useState(props.item.clothes_type)
    const [clothesPrice, setClothesPrice] = useState(props.item.clothes_price)
    const [clothesBuyAt, setClothesBuyAt] = useState(props.item.clothes_buy_at)
    const [clothesQty, setClothesQty] = useState(props.item.clothes_qty)
    const [isFaded, setIsFaded] = useState(Boolean(props.item.is_faded))
    const [hasWashed, setHasWashed] = useState(Boolean(props.item.has_washed))
    const [hasIroned, setHasIroned] = useState(Boolean(props.item.has_ironed))
    const [isFavorite, setIsFavorite] = useState(Boolean(props.item.is_favorite))
    const [isScheduled, setIsScheduled] = useState(Boolean(props.item.is_scheduled))

    // Dictionaries for select options
    const [clothesSizeDictionary, setClothesSizeDictionary] = useState([])
    const [clothesGenderDictionary, setClothesGenderDictionary] = useState([])
    const [clothesMadeFromDictionary, setClothesMadeFromDictionary] = useState([])
    const [clothesCategoryDictionary, setClothesCategoryDictionary] = useState([])
    const [clothesTypeDictionary, setClothesTypeDictionary] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/dct/clothes_size,clothes_gender,clothes_made_from,clothes_category,clothes_type`, {
            headers: {
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data) 
                
                const size = []
                const gender = []
                const madeFrom = []
                const category = []
                const type = []

                result.data.forEach((el) => {
                    if (el.dictionary_type === "clothes_size") size.push(el.dictionary_name)
                    else if (el.dictionary_type === "clothes_gender") gender.push(el.dictionary_name)
                    else if (el.dictionary_type === "clothes_made_from") madeFrom.push(el.dictionary_name)
                    else if (el.dictionary_type === "clothes_category") category.push(el.dictionary_name)
                    else if (el.dictionary_type === "clothes_type") type.push(el.dictionary_name)
                })

                setClothesSizeDictionary(size)
                setClothesGenderDictionary(gender)
                setClothesMadeFromDictionary(madeFrom)
                setClothesCategoryDictionary(category)
                setClothesTypeDictionary(type)
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
    },[])

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
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesField title="Clothes Name" type={'text'} defaultValue={clothesName} handleChange={(e) => {
                        setClothesName(e.target.value)
                    }}/>
                    <MoleculesField title="Description" type={'textarea'} defaultValue={clothesDesc} handleChange={(e) => {
                        setClothesDesc(e.target.value)
                    }}/>
                    <MoleculesField title="Merk" type={'text'} defaultValue={clothesMerk} handleChange={(e) => {
                        setClothesMerk(e.target.value)
                    }}/>
                    <button className='btn btn-success mt-3'><FontAwesomeIcon icon={faFloppyDisk}/> Save Changes</button>
                </div> 
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='row'>
                        <div className='col-lg-8 col-md-7 col-sm-6 col-12'>
                            <MoleculesField title="Price" type={'number'} defaultValue={clothesPrice} handleChange={(e) => {
                                setClothesPrice(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-4 col-md-5 col-sm-6 col-12'>
                            <MoleculesField title="Qty" type={'number'} defaultValue={clothesQty} handleChange={(e) => {
                                setClothesQty(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-md-2 col-sm-6 col-12'>
                            <MoleculesField title="Gender" type={'select'} defaultValue={clothesGender} items={clothesGenderDictionary} handleChange={(e) => {
                                setClothesGender(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-6 col-12'>
                            <MoleculesField title="Size" type="select" defaultValue={clothesSize} items={clothesSizeDictionary} handleChange={(e) => setClothesSize(e.target.value)}/>
                        </div>
                        <div className='col-lg-5 col-md-6 col-sm-6 col-12'>
                            <MoleculesField title="Type" type="select" defaultValue={clothesType} items={clothesTypeDictionary} handleChange={(e) => setClothesType(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                            <MoleculesField title="Made From" type="select" defaultValue={clothesMadeFrom} items={clothesMadeFromDictionary} handleChange={(e) => setClothesMadeFrom(e.target.value)}/>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                            <MoleculesField title="Category" type="select" defaultValue={clothesCategory} items={clothesCategoryDictionary} handleChange={(e) => setClothesCategory(e.target.value)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-start'>
                        <div className='me-2'>
                            <MoleculesField title="Is Faded" type="toggle" defaultValue={isFaded == 1 ? true : false} handleChange={(e)=>setIsFaded(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Washed" type="toggle" defaultValue={hasWashed == 1 ? true : false} handleChange={(e)=>setHasWashed(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Ironed" type="toggle" defaultValue={hasIroned == 1 ? true : false} handleChange={(e)=>setHasIroned(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Favorite" type="toggle" defaultValue={isFavorite == 1 ? true : false} handleChange={(e)=>setIsFavorite(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Scheduled" type="toggle" defaultValue={isScheduled == 1 ? true : false} handleChange={(e)=>setIsScheduled(e == true ? 1 : 0)}/>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
  