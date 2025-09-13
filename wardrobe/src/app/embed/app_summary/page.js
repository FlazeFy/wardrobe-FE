"use client"
import MoleculesAlertBox from "@/components/molecules/molecules_alert_box"
import { fetchWelcomeStats } from "@/modules/repositories/general_repository"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import styles from "../../page.module.css"

export default function EmbedAppSummaryPage() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        const now = new Date()
        fetchWelcomeStats(
            now,
            (data) => {
                setIsLoaded(true)
                setItems(data)
            },
            (err) => {
                setError(err)
            }
        )
    }, [])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h3 className='text-center text-white mt-2 fst-italic'>Loading...</h3>
    } else {
        return (
            <main className={styles.main}>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.total_user} {items.total_user > 0 && '+'}</h1>
                    <h3 className="text-secondary">Active User</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.total_outfit_decision} {items.total_outfit_decision > 0 && '+'}</h1>
                    <h3 className="text-secondary">Outfit Decision</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.total_schedule} {items.total_schedule > 0 && '+'}</h1>
                    <h3 className="text-secondary">Schedule Reminder</h3>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0">{items.total_clothes} {items.total_clothes > 0 && '+'}</h1>
                    <h3 className="text-secondary">Clothes</h3>
                </div>
            </main>
        )
    }
}