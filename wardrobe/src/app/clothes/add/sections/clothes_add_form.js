"use client"
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import React, { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesField from '../../../../components/molecules/molecules_field'

export default function ClothesAddForm(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [msgAll, setResMsgAll] = useState(null)

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

                setClothesSize(size[0])
                setClothesGender(gender[0])
                setClothesMadeFrom(madeFrom[0])
                setClothesCategory(category[0])
                setClothesType(type[0])
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
            const formData = new FormData()
            formData.append("clothes_name", clothesName)
            formData.append("clothes_desc", clothesDesc)
            formData.append("clothes_merk", clothesMerk)
            formData.append("clothes_size", clothesSize)
            formData.append("clothes_gender", clothesGender)
            formData.append("clothes_made_from", clothesMadeFrom)
            formData.append("clothes_color", "black") // for now
            formData.append("clothes_category", clothesCategory)
            formData.append("clothes_type", clothesType)
            formData.append("clothes_price", clothesPrice)
            formData.append("clothes_buy_at", clothesBuyAt)
            formData.append("clothes_qty", clothesQty)
            formData.append("file", clothesImage)
            formData.append("is_faded", isFaded ? 1 : 0)
            formData.append("has_washed", hasWashed ? 1 : 0)
            formData.append("has_ironed", hasIroned ? 1 : 0)
            formData.append("is_favorite", isFavorite ? 1 : 0)
            formData.append("is_scheduled", isScheduled ? 1 : 0)

            Swal.showLoading()
            const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes", formData, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`,
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
                        window.location.href = `/clothes/detail/${response.data.data.id}`
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

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setClothesImage(reader.result)
            };
            reader.readAsDataURL(file)
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
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                            <MoleculesField title="Buy At" type="date" defaultValue={clothesBuyAt} handleChange={(e) => setClothesBuyAt(e.target.value)}/>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                        </div>
                    </div>
                    {/* {
                        msgAll && <MoleculesAlertBox message={msgAll} type='danger' context={'Add Clothes Failed'}/>
                    } */}
                    <button className='btn btn-success mt-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk}/> Save Changes</button>
                </div> 
                <div className='col-lg-6 col-md-6 col-sm-12 col-12'>
                    <img src={clothesImage || "/images/shoes_sample.jpg"} style={{maxWidth:"50%", minWidth:"100px"}} className="img img-fluid img-rounded d-block mx-auto"/>
                    <MoleculesField title="Clothes Image" type="file" handleChange={handleImageChange} accept="image/*"/>
                    <MoleculesAlertBox message="For clothes image you can upload photo of your clothes with file type PNG, JPG, JPEG, or GIF. And have maximum size at the 10 Mb" type='primary' context={"tips_clothes_image"}/>
                    <hr></hr>
                    <div className='d-flex justify-content-start'>
                        <div className='me-2'>
                            <MoleculesField title="Is Faded" type="toggle" defaultValue={isFaded} handleChange={(e)=>setIsFaded(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Washed" type="toggle" defaultValue={hasWashed} handleChange={(e)=>setHasWashed(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Has Ironed" type="toggle" defaultValue={hasIroned} handleChange={(e)=>setHasIroned(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Favorite" type="toggle" defaultValue={isFavorite} handleChange={(e)=>setIsFavorite(e)}/>
                        </div>
                        <div className='me-2'>
                            <MoleculesField title="Is Scheduled" type="toggle" defaultValue={isScheduled} handleChange={(e)=>setIsScheduled(e)}/>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
