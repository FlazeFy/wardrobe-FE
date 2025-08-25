"use client"
import MoleculesAlertBox from "@/components/molecules/molecules_alert_box"
import { formatCurrency } from "@/modules/helpers/converter"
import { fetchClothesSummary } from "@/modules/repositories/clothes_repository"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import styles from "../../page.module.css"

export default function EmbedAppSummaryPage(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        const now = new Date()
        fetchClothesSummary(
            now,
            (data) => {
                setIsLoaded(true)
                setItems(data)
            },
            (err) => {
                setError(err)
            },
            null
        )
    }, [])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h3 className='text-center text-white mt-2 fst-italic'>Loading...</h3>
            </div>
        )
    } else {
        return (
            <main className={styles.main}>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.total_clothes}</h1>
                    <h3 className="text-secondary">Clothes Variety</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.sum_clothes_qty}</h1>
                    <h3 className="text-secondary">Clothes Quantity</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.max_price ? formatCurrency(items.max_price) : "-"}</h1>
                    <h3 className="text-secondary">Most Expensive</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.avg_price ? formatCurrency(items.avg_price) : "-"}</h1>
                    <h3 className="text-secondary">Average Price</h3>
                </div>
            </main>
        )
    }
}