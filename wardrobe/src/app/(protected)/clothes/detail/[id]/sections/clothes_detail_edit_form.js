"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../../components/molecules/molecules_field'
import { getLocal, storeLocal } from '../../../../../../modules/storages/local'
import { getDictionaryByTypeRepo } from '@/modules/repositories/dictionary_repository'

export default function ClothesDetailEditForm(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
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
    const now = new Date()

    // Dictionaries for select options
    const [clothesSizeDictionary, setClothesSizeDictionary] = useState([])
    const [clothesGenderDictionary, setClothesGenderDictionary] = useState([])
    const [clothesMadeFromDictionary, setClothesMadeFromDictionary] = useState([])
    const [clothesCategoryDictionary, setClothesCategoryDictionary] = useState([])
    const [clothesTypeDictionary, setClothesTypeDictionary] = useState([])

    const fetchDct = () => {
        const oldTimeHit = getLocal('last_hit-dct_all_dct')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            const size = []
            const gender = []
            const madeFrom = []
            const category = []
            const type = []

            data.forEach((el) => {
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

            setClothesSize(size[0])
            setClothesGender(gender[0])
            setClothesMadeFrom(madeFrom[0])
            setClothesCategory(category[0])
            setClothesType(type[0])
        }
    
        if (timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('dct_all_dct'))
            fetchData(oldData)
        } else {
            getDictionaryByTypeRepo((result) => {
                setIsLoaded(true)
                fetchData(result)
                storeLocal('dct_all_dct', JSON.stringify(result))
                storeLocal('last_hit-dct_all_dct', JSON.stringify(now)) 
            }, (error) => {
                setError(error)
            })
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchDct()
    },[])

    const handleSave = (deleted_at) => {
        if(deleted_at){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can't edit deleted clothes. Recover it to make it editable",
                confirmButtonText: "Okay!"
            })
        } else {

        }
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesField title="Clothes Name" type={'text'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesName} handleChange={(e) => {
                        setClothesName(e.target.value)
                    }}/>
                    <MoleculesField title="Description" type={'textarea'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesDesc} handleChange={(e) => {
                        setClothesDesc(e.target.value)
                    }}/>
                    <MoleculesField title="Merk" type={'text'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesMerk} handleChange={(e) => {
                        setClothesMerk(e.target.value)
                    }}/>
                    <button className='btn btn-success mt-3' onClick={(e) => handleSave(props.item.deleted_at)}><FontAwesomeIcon icon={faFloppyDisk}/> Save Changes</button>
                </div> 
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <div className='row'>
                        <div className='col-lg-8 col-md-7 col-sm-6 col-8'>
                            <MoleculesField title="Price" type={'number'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesPrice} handleChange={(e) => {
                                setClothesPrice(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-4 col-md-5 col-sm-6 col-4'>
                            <MoleculesField title="Qty" type={'number'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesQty} handleChange={(e) => {
                                setClothesQty(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-md-7 col-sm-6 col-8'>
                            <MoleculesField title="Gender" type={'select'} isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesGender} items={clothesGenderDictionary} handleChange={(e) => {
                                setClothesGender(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-3 col-md-5 col-sm-6 col-4'>
                            <MoleculesField title="Size" type="select" isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesSize} items={clothesSizeDictionary} handleChange={(e) => setClothesSize(e.target.value)}/>
                        </div>
                        <div className='col-lg-5 col-md-12 col-sm-12 col-12'>
                            <MoleculesField title="Type" type="select" isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesType} items={clothesTypeDictionary} handleChange={(e) => setClothesType(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-6 col-12'>
                            <MoleculesField title="Made From" type="select" isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesMadeFrom} items={clothesMadeFromDictionary} handleChange={(e) => setClothesMadeFrom(e.target.value)}/>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-6 col-12'>
                            <MoleculesField title="Category" type="select" isDisabled={props.item.deleted_at ? true : false} defaultValue={clothesCategory} items={clothesCategoryDictionary} handleChange={(e) => setClothesCategory(e.target.value)}/>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='d-flex justify-content-start'>
                        <div className='me-2'>
                            <MoleculesField title="Is Faded" type="toggle" isDisabled={props.item.deleted_at ? true : false} defaultValue={isFaded == 1 ? true : false} handleChange={(e)=>setIsFaded(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Washed" type="toggle" isDisabled={props.item.deleted_at ? true : false} defaultValue={hasWashed == 1 ? true : false} handleChange={(e)=>setHasWashed(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Ironed" type="toggle" isDisabled={props.item.deleted_at ? true : false} defaultValue={hasIroned == 1 ? true : false} handleChange={(e)=>setHasIroned(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Favorite" type="toggle" isDisabled={props.item.deleted_at ? true : false} defaultValue={isFavorite == 1 ? true : false} handleChange={(e)=>setIsFavorite(e == true ? 1 : 0)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Scheduled" type="toggle" isDisabled={props.item.deleted_at ? true : false} defaultValue={isScheduled == 1 ? true : false} handleChange={(e)=>setIsScheduled(e == true ? 1 : 0)}/>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
  