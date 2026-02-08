"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../../components/molecules/molecules_field'
import { getLocal, storeLocal } from '../../../../../modules/storages/local'
import { useRouter } from 'next/navigation'
import { postClothes } from '@/modules/repositories/clothes_repository'
import { fetchDictionary } from '@/modules/repositories/dictionary_repository'

export default function ClothesAddForm(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [clothesName, setClothesName] = useState("")
    const [clothesDesc, setClothesDesc] = useState("")
    const [clothesMerk, setClothesMerk] = useState("")
    const [clothesSize, setClothesSize] = useState("")
    const [clothesGender, setClothesGender] = useState("")
    const [clothesMadeFrom, setClothesMadeFrom] = useState("")
    const [clothesColor, setClothesColor] = useState("")
    const [clothesCategory, setClothesCategory] = useState("")
    const [clothesType, setClothesType] = useState("")
    const [clothesPrice, setClothesPrice] = useState(0)
    const [clothesBuyAt, setClothesBuyAt] = useState("")
    const [clothesQty, setClothesQty] = useState(1)
    const [clothesImage, setClothesImage] = useState(null)
    const [isFaded, setIsFaded] = useState(false)
    const [hasWashed, setHasWashed] = useState(false)
    const [hasIroned, setHasIroned] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isScheduled, setIsScheduled] = useState(false)
    const now = new Date()
    const router = useRouter()

    // Dictionaries for select options
    const [clothesSizeDictionary, setClothesSizeDictionary] = useState([])
    const [clothesGenderDictionary, setClothesGenderDictionary] = useState([])
    const [clothesMadeFromDictionary, setClothesMadeFromDictionary] = useState([])
    const [clothesCategoryDictionary, setClothesCategoryDictionary] = useState([])
    const [clothesTypeDictionary, setClothesTypeDictionary] = useState([])

    const fetchDct = () => {
        const oldTimeHit = getLocal('last_hit-dct_all_dct')
    
        // Set value of dictionary based on the type
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
    
        // Check temp data expired time
        if (oldTimeHit) {
            const oldTime = new Date(JSON.parse(oldTimeHit))
            const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
            if (timeDiffInSec < 540) {
                const oldData = JSON.parse(getLocal('dct_all_dct'))
                fetchData(oldData)
                return
            }
        }
    
        // Fetch repo
        fetchDictionary(
            (data) => {
                fetchData(data)
                storeLocal('dct_all_dct', JSON.stringify(data))
                storeLocal('last_hit-dct_all_dct', JSON.stringify(now))
            },
            (error) => {
                setError(error)
            },
            'clothes_size,clothes_gender,clothes_made_from,clothes_category,clothes_type'
        )
    }

    useEffect(() => {
        Swal.showLoading()
        fetchDct()
    },[])

    // Services
    const handleSubmit = async (e) => {
        postClothes(clothesName,clothesDesc,clothesMerk,clothesSize,clothesGender,clothesMadeFrom,clothesCategory,
            clothesType,clothesPrice,clothesBuyAt,clothesQty,clothesImage,isFaded,hasWashed,hasIroned,isFavorite,isScheduled,router)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setClothesImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
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
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesField title="Clothes Name" id="clothes_name" type={'text'} defaultValue={clothesName} handleChange={(e) => {
                        setClothesName(e.target.value)
                    }}/>
                    <MoleculesField title="Description" id="clothes_desc" type={'textarea'} defaultValue={clothesDesc} handleChange={(e) => {
                        setClothesDesc(e.target.value)
                    }}/>
                    <MoleculesField title="Merk" id="clothes_merk" type={'text'} defaultValue={clothesMerk} handleChange={(e) => {
                        setClothesMerk(e.target.value)
                    }}/>
                    <div className='row'>
                        <div className='col-lg-8 col-md-7 col-sm-6 col-8'>
                            <MoleculesField title="Price" id="clothes_price" type={'number'} defaultValue={clothesPrice} handleChange={(e) => {
                                setClothesPrice(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-4 col-md-5 col-sm-6 col-4'>
                            <MoleculesField title="Qty" id="clothes_qty" type={'number'} defaultValue={clothesQty} handleChange={(e) => {
                                setClothesQty(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 col-md-6 col-sm-6 col-8'>
                            <MoleculesField title="Gender" id="clothes_gender" type={'select'} defaultValue={clothesGender} items={clothesGenderDictionary} handleChange={(e) => {
                                setClothesGender(e.target.value)
                            }}/>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-6 col-4'>
                            <MoleculesField title="Size" type="select" id="clothes_size" defaultValue={clothesSize} items={clothesSizeDictionary} handleChange={(e) => setClothesSize(e.target.value)}/>
                        </div>
                        <div className='col-lg-5 col-md-12 col-sm-12 col-12'>
                            <MoleculesField title="Type" type="select" id="clothes_type" defaultValue={clothesType} items={clothesTypeDictionary} handleChange={(e) => setClothesType(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-7 col-md-12 col-sm-6 col-12'>
                            <MoleculesField title="Made From" type="select" id="clothes_made_from" defaultValue={clothesMadeFrom} items={clothesMadeFromDictionary} handleChange={(e) => setClothesMadeFrom(e.target.value)}/>
                        </div>
                        <div className='col-lg-5 col-md-12 col-sm-6 col-12'>
                            <MoleculesField title="Category" type="select" id="clothes_category" defaultValue={clothesCategory} items={clothesCategoryDictionary} handleChange={(e) => setClothesCategory(e.target.value)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                            <MoleculesField title="Buy At" type="date" id="clothes_buy_at" defaultValue={clothesBuyAt} handleChange={(e) => setClothesBuyAt(e.target.value)}/>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                        </div>
                    </div>
                    {/* {
                        msgAll && <MoleculesAlertBox message={msgAll} type='danger' context={'Add Clothes Failed'}/>
                    } */}
                    <button className='btn btn-success mt-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save Changes</button>
                </div> 
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <MoleculesAlertBox message="For clothes image you can upload photo of your clothes with file type PNG, JPG, JPEG, or GIF. And have maximum size at the 10 Mb" type='primary' context={"tips_clothes_image"}/>
                    <img src={clothesImage || "/images/shoes_sample.jpg"} style={{maxWidth:"50%", minWidth:"100px"}} className="img img-fluid img-rounded d-block mx-auto"/>
                    <MoleculesField title="Clothes Image" type="file" handleChange={handleImageChange} accept="image/*"/>
                    <hr></hr>
                    <h2 className="fw-bold">Clothes Status</h2>
                    <div className='d-flex justify-content-start'>
                        <div className='me-2'>
                            <MoleculesField title="Is Faded" type="toggle" id="is_faded" defaultValue={isFaded} handleChange={(e)=>setIsFaded(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Washed" type="toggle" id="has_washed" defaultValue={hasWashed} handleChange={(e)=>setHasWashed(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Ironed" type="toggle" id="has_ironed" defaultValue={hasIroned} handleChange={(e)=>setHasIroned(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Favorite" type="toggle" id="is_favorite" defaultValue={isFavorite} handleChange={(e)=>setIsFavorite(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Scheduled" type="toggle" id="is_scheduled" defaultValue={isScheduled} handleChange={(e)=>setIsScheduled(e)}/>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
