"use client"
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingFeedback() {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [average, setAverage] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/feedback/top`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data) 
                setAverage(result.average)
                setTotal(result.total)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
                setError(error)
            }
        )
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        // Fixed to 4 item only
        return (
            <div className="mx-4">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end">
                        <div className="d-flex justify-content-start align-items-center">
                            <div className="p-2">
                                <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[0].feedback_rate}</h3>
                                <h5 className="text-secondary">{items[0].feedback_body}, <span className="text-secondary">by {items[0].username}</span></h5>
                            </div>
                            <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                                <div className="text-start">
                                    <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[1].feedback_rate}</h3>
                                    <h5 className="text-secondary">{items[1].feedback_body}, <span className="text-secondary">by {items[1].username}</span></h5>
                                    <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                </div>
                                <div className="text-end">
                                    <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                    <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[2].feedback_rate}</h3>
                                    <h5 className="text-secondary">{items[2].feedback_body}, <span className="text-secondary">by {items[2].username}</span></h5>
                                </div>
                            </div>
                            <div className="p-2 text-start">
                                <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                                <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> {items[3].feedback_rate}</h3>
                                <h5 className="text-secondary">{items[3].feedback_body}, <span className="text-secondary">by {items[3].username}</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end">
                        <AtomsBreakLine length={4}/>
                        <h2 className="mb-0">{average} Average Rate<span className="text-secondary" style={{fontSize:"var(--textXLG)"}}>, from total <b>{total}</b> feedback</span></h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>What they say?</h1>
                        <h2 className="mb-2">Give your experience when using us too</h2>
                        <a className="btn btn-success fw-bold" href="/feedback"><FontAwesomeIcon icon={faArrowRight}/> Feedback</a>
                    </div>
                </div>
            </div>
        );
    }
}
