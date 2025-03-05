"use client"
import MoleculesChartPie from '../../../components/molecules/molecules_chart_pie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../components/molecules/molecules_alert_box'
import { getCookie } from '../../../modules/storages/cookie'

export default function StatsSectionMostClothesCtx(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [itemsClothesType, setItemsClothesType] = useState([])
    const [itemsClothesMerk, setItemsClothesMerk] = useState([])
    const [itemsClothesSize, setItemsClothesSize] = useState([])
    const [itemsClothesMade, setItemsClothesMade] = useState([])
    const [itemsClothesCategory, setItemsClothesCategory] = useState([])
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/clothes/by/clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItemsClothesType(result.data.clothes_type)  
                setItemsClothesMerk(result.data.clothes_merk)  
                setItemsClothesSize(result.data.clothes_size)  
                setItemsClothesMade(result.data.clothes_made_from)  
                setItemsClothesCategory(result.data.clothes_category)  
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    },[])

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
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <h3>By Its Merk</h3>
                        <MoleculesChartPie items={itemsClothesMerk}/>  
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <h3>By Its Size</h3>
                        <MoleculesChartPie items={itemsClothesSize}/>  
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <h3>By Its Made From</h3>
                        <MoleculesChartPie items={itemsClothesMade}/>  
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <h3>By Its Type</h3>
                        <MoleculesChartPie items={itemsClothesType}/>  
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="card">
                        <h3>By Its Category</h3>
                        <MoleculesChartPie items={itemsClothesCategory}/>  
                    </div>
                </div>
            </>
        )
    }
}
  