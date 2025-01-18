"use client"
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";
import { faArrowRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function LandingSectionLastOutfit() {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [todayName, setTodayName] = useState("")
    const [items, setItems] = useState(null)

    useEffect(() => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const today = new Date()
        setTodayName(daysOfWeek[today.getDay()])
        fetchLastOutfit()
        setIsLoaded(true)
    },[])

    const fetchLastOutfit = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/last`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then((res) => res.json())
        .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                setError(error)
            }
        )
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className="mx-4">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        {
                            items &&
                            <>
                                <div className="d-inline-block mb-2">
                                {
                                    items.clothes.map((dt, idx) => {
                                        let maxWidth

                                        switch (idx) {
                                        case 0:
                                            maxWidth = "20%"
                                            break
                                        case 1:
                                            maxWidth = "25%"
                                            break
                                        case 2:
                                            maxWidth = "22%"
                                            break
                                        case 3:
                                            maxWidth = "18%"
                                            break
                                        default:
                                            maxWidth = "15%"
                                        }

                                        return <img src={dt.clothes_image ?? "/images/hat_sample.jpg"} style={{ maxWidth, minWidth: "100px" }} className={`img img-fluid img-rounded ${idx === items.clothes.length - 2 ? "me-3" : ""}`} key={idx}/>
                                    })
                                }
                                </div>
                                <h5 className="text-secondary mb-0">Set at {items.last_used}</h5>
                            </>
                        }
                        <h2 className="mb-0">{ items ? <>Last Outfit</> : <span className="text-secondary">- No Outfit History Found -</span>}</h2>
                        <hr></hr>
                        {
                            items ? 
                                <h2 className="mb-0">See more outfit history? <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faArrowRight}/> History</a></h2>
                            :
                                <h2 className="mb-0">Use your outfit right now, or create a new one? <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faArrowRight}/> Add New Outfit</a></h2>
                        }
                        <AtomsBreakLine length={4}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <div className="container-generator">
                            <div className="position-absolute text-end" style={{top:"var(--spaceXLG)",right:"var(--spaceXLG)"}}>
                                <h5>32°C | Rainy | 75% Humidity</h5>
                                <h4>Today is {todayName}</h4>
                            </div>
                            <h3 className="mb-2">Do you want to hangout?</h3>
                            <p>We can generate your today's outfit based on outfit in wardrobe, cleaning status, routine, schedule, time, and today's weather. You can also set exception for some clothes, or just randomize between few clothes based on your need.</p>
                            <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faDice}/> Set My Outfit Now!</a>
                        </div>
                        <AtomsBreakLine length={4}/>
                    </div>
                </div>
            </div>
        );
    }
}
