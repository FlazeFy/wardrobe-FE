"use client"
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box"
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { fetchFeedback } from "@/modules/repositories/feedback_repository"
import Link from "next/link"

export default function LandingFeedback(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [average, setAverage] = useState(0)
    const [total, setTotal] = useState(0)
    const now = new Date()

    useEffect(() => {
        Swal.showLoading()
        fetchFeedback(
            now,
            (data) => {
                setIsLoaded(true)
                setItems(data.data) 
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
        // Fixed to 4 item only
        return (
            <div className="row">
                <div className="col-xl-6 col-lg-12 text-end">
                    <div className="d-block d-sm-flex justify-content-start align-items-center">
                        <div className="p-2">
                            <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                            <h5 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[0].feedback_rate}</h5>
                            <p className="text-secondary">{items[0].feedback_body}, <span className="text-secondary">by {items[0].username}</span></p>
                        </div>
                        <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                            <div className="text-start">
                                <h5 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[1].feedback_rate}</h5>
                                <p className="text-secondary">{items[1].feedback_body}, <span className="text-secondary">by {items[1].username}</span></p>
                                <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                            </div>
                            <div className="text-end">
                                <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h5 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[2].feedback_rate}</h5>
                                <p className="text-secondary">{items[2].feedback_body}, <span className="text-secondary">by {items[2].username}</span></p>
                            </div>
                        </div>
                        <div className="p-2 text-start">
                            <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                            <h5 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[3].feedback_rate}</h5>
                            <p className="text-secondary">{items[3].feedback_body}, <span className="text-secondary">by {items[3].username}</span></p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12 text-center text-xl-end d-flex flex-column justify-content-center">
                    <h3 className="mb-0">{average} Average Rate<span className="text-secondary" style={{fontSize:"var(--textXLG)"}}>, from total <b>{total}</b> feedback</span></h3>
                    <hr></hr>
                    <h2 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>What <span className="text-main">they say</span>?</h2>
                    <h4>Give your experience when using us too</h4>
                    <div className="d-flex justify-content-center justify-content-xl-end">
                        <Link href="/feedback">
                            <button className="btn btn-success fw-bold"><FontAwesomeIcon icon={faArrowRight}/> Feedback</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
