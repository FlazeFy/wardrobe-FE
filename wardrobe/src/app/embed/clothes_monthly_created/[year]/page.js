"use client"
import MoleculesAlertBox from "@/components/molecules/molecules_alert_box"
import MoleculesLineChart from "@/components/molecules/molecules_line_chart"
import { fetchMonthlyClothes } from "@/modules/repositories/stats_repository"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function EmbedClothesMonthlyCreatedPage({params}) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        Swal.showLoading()
            fetchMonthlyClothes(
            params.year, 
            (data) => {
                setIsLoaded(true)
                setItems(data)
            },
            (err) => {
                setError(err)
            },
            null)
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return items ? <MoleculesLineChart data={items}/> : <MoleculesNoData title="No Clothes Found"/>
    }
}