"use client"
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCookie } from "../../modules/storages/cookie";
import { getLocal, storeLocal } from '../../modules/storages/local'

export default function LandingSectionWelcoming(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [usernameKey, setUsernameKey] = useState(null)
    const now = new Date()

    const fetchWelcomeStats = () => {
        const oldTimeHit = getLocal('last_hit-welcome_stats')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data)
        }
    
        if (timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('welcome_stats'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/stats/all`)
            .then(res => res.json())
                .then(
                (result) => {
                    Swal.close()
                    setIsLoaded(true)
                    fetchData(result.data)
                    storeLocal('welcome_stats', JSON.stringify(result.data))
                    storeLocal('last_hit-welcome_stats', JSON.stringify(now)) 
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
        }
    }

    useEffect(() => {
        Swal.showLoading()
        fetchWelcomeStats()
        setUsernameKey(getCookie('username_key'))
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
            <div className="mx-4" style={{marginTop:"8vh"}}>
                <div className="row">
                    <div className="col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="container-fluid custom-container" id="welcome-section">
                            <AtomsBreakLine length={2}/>
                            <h2 className="mb-0">Wardrobe is your ultimate clothing assistant, helping you organize outfits, track history, manage schedules, and plan weekly looks</h2>
                            <hr></hr>
                            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Effortless style <span className="text-main">decision and Organize</span></h1>
                            <h2 className="mb-0">{usernameKey ? <>Welcome, {usernameKey}</> : <>Join us Now. Its <span className="text-success fw-bold">Free!</span></>}</h2>
                            <AtomsBreakLine length={2}/>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-end d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-end align-items-center" id="summary_apps-section">
                            <div className="p-2">
                                <img src={"/images/people.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h3 className="fw-bold mb-0">{items.total_user} {items.total_user > 0 && '+'}</h3>
                                <h5 className="text-secondary">Active User</h5>
                            </div>
                            <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                                <div className="text-start">
                                    <h3 className="fw-bold mb-0">{items.total_outfit_decision} {items.total_outfit_decision > 0 && '+'}</h3>
                                    <h5 className="text-secondary">Outfit Decision</h5>
                                    <img src={"/images/outfit.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                </div>
                                <div className="text-end">
                                    <img src={"/images/reminder.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                    <h3 className="fw-bold mb-0">{items.total_schedule} {items.total_schedule > 0 && '+'}</h3>
                                    <h5 className="text-secondary">Schedule Reminder</h5>
                                </div>
                            </div>
                            <div className="p-2 text-start">
                                <img src={"/images/clothes.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h3 className="fw-bold mb-0">{items.total_clothes} {items.total_clothes > 0 && '+'}</h3>
                                <h5 className="text-secondary">Clothes</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
