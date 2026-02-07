"use client"
import MoleculesAlertBox from "@/components/molecules/molecules_alert_box"
import { fetchFeedback } from "@/modules/repositories/feedback_repository"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import styles from "../../page.module.css"

export default function EmbedFeedbackSummaryPage(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [average, setAverage] = useState(0)
    const [total, setTotal] = useState(0)
    const now = new Date()

    useEffect(() => {
        Swal.showLoading()
        fetchFeedback(
            now,
            (data) => {
                setIsLoaded(true)
                setAverage(data.average)
                setTotal(data.total)
            },
            (err) => {
                setError(err)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <main className={styles.main}>
                <div className="p-2">
                    <h1 className="fw-bold mb-0" style={{fontSize:"var(--textXJumbo)"}}>{average}</h1>
                    <h2 className="text-secondary">Average Feedback</h2>
                </div>
                <div className="p-2">
                    <h1 className="fw-bold mb-0" style={{fontSize:"var(--textXJumbo)"}}>{total}</h1>
                    <h2 className="text-secondary">Total Feedback</h2>
                </div>
            </main>
        )
    }
}