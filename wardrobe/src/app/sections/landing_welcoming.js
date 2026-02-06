"use client"
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { fetchWelcomeStats } from "@/modules/repositories/general_repository"
import useAuthStore from "@/modules/store/auth_store"

export default function LandingSectionWelcoming(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const { username } = useAuthStore()

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
        return <p className='text-center text-white mt-2 fst-italic'>Loading...</p>
    } else {
        return (
            <div className="row">
                <div className="col-xl-6 col-lg-12 text-center text-xl-start">
                    <div className="container-fluid custom-container" id="welcome-section">
                        <h4 className="mb-0">Wardrobe is your ultimate clothing assistant, helping you organize outfits, track history, manage schedules, and plan weekly looks</h4>
                        <hr></hr>
                        <h2 className="mb-4 text-title" style={{fontWeight:"800"}}>Effortless style <span className="text-main">decision and Organize</span></h2>
                        <h1 className="mb-0">{username ? <>Welcome, {username}</> : <>Join us Now. Its <span className="text-success fw-bold">Free!</span></>}</h1>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 text-end d-flex flex-column justify-content-center">
                    <div className="d-flex justify-content-end align-items-center" id="summary_apps-section">
                        <div className="p-2">
                            <img src={"/images/people.jpg"} style={{maxWidth:"70%", minWidth:"100px"}} className="img img-fluid mb-2 img-rounded"/>
                            <h5 className="fw-bold mb-0">{items.total_user} {items.total_user > 0 && '+'}</h5>
                            <p className="text-secondary mb-0">Active User</p>
                        </div>
                        <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                            <div className="text-start">
                                <h5 className="fw-bold mb-0">{items.total_outfit_decision} {items.total_outfit_decision > 0 && '+'}</h5>
                                <p className="text-secondary mb-0">Outfit Decision</p>
                                <img src={"/images/outfit.jpg"} style={{maxWidth:"70%", minWidth:"100px"}} className="img img-fluid mb-2 img-rounded"/>
                            </div>
                            <div className="text-end">
                                <img src={"/images/reminder.jpg"} style={{maxWidth:"70%", minWidth:"100px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h5 className="fw-bold mb-0">{items.total_schedule} {items.total_schedule > 0 && '+'}</h5>
                                <p className="text-secondary mb-0">Schedule Reminder</p>
                            </div>
                        </div>
                        <div className="p-2 text-start">
                            <img src={"/images/clothes.jpg"} style={{maxWidth:"70%", minWidth:"100px"}} className="img img-fluid mb-2 img-rounded"/>
                            <h5 className="fw-bold mb-0">{items.total_clothes} {items.total_clothes > 0 && '+'}</h5>
                            <p className="text-secondary mb-0">Clothes</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
