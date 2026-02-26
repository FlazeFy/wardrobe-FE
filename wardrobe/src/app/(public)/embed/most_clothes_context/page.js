"use client"
import MoleculesChartPie from '../../../../components/molecules/molecules_chart_pie'
import React from 'react'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import MoleculesAlertBox from '../../../../components/molecules/molecules_alert_box'
import MoleculesNoData from '../../../../components/molecules/molecules_no_data'
import { fetchMostClothesCtx } from '@/modules/repositories/stats_repository'

export default function EmbedMostClothesCtx(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [itemsClothesType, setItemsClothesType] = useState([])
    const [itemsClothesMerk, setItemsClothesMerk] = useState([])
    const [itemsClothesSize, setItemsClothesSize] = useState([])
    const [itemsClothesMade, setItemsClothesMade] = useState([])
    const [itemsClothesCategory, setItemsClothesCategory] = useState([])

    useEffect(() => {
        Swal.showLoading()
        fetchMostClothesCtx(
            (result) => {
                setItemsClothesType(result.clothes_type)  
                setItemsClothesMerk(result.clothes_merk)  
                setItemsClothesSize(result.clothes_size)  
                setItemsClothesMade(result.clothes_made_from)  
                setItemsClothesCategory(result.clothes_category)  
                finish()
            }, 
            (error) => {
                setError(error)
                finish()
            }, 'clothes_type,clothes_merk,clothes_size,clothes_made_from,clothes_category'
        )
        
        const finish = () => {
            setIsLoaded(true)
            Swal.close()
        }
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className='row'> 
                {
                    itemsClothesMerk.length == 0 && itemsClothesSize.length == 0 && itemsClothesMade.length == 0 && itemsClothesType.length == 0 && itemsClothesCategory.length == 0 ?
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3 mx-auto">
                            <MoleculesNoData title="No Clothes Found"/>
                        </div>
                    :
                        <>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3">
                                <div className="card">
                                    <h3>By Its Merk</h3>
                                    <MoleculesChartPie items={itemsClothesMerk}/>  
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3">
                                <div className="card">
                                    <h3>By Its Size</h3>
                                    <MoleculesChartPie items={itemsClothesSize}/>  
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3">
                                <div className="card">
                                    <h3>By Its Made From</h3>
                                    <MoleculesChartPie items={itemsClothesMade}/>  
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3">
                                <div className="card">
                                    <h3>By Its Type</h3>
                                    <MoleculesChartPie items={itemsClothesType}/>  
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-3">
                                <div className="card">
                                    <h3>By Its Category</h3>
                                    <MoleculesChartPie items={itemsClothesCategory}/>  
                                </div>
                            </div>
                        </>
                }
            </div>
        )
    }
}
  