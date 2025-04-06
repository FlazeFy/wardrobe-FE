"use client"
import OrganismsClothesHeader from "../../../components/organisms/organisms_clothes_header";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../components/molecules/molecules_alert_box";
import { getCookie } from "../../../modules/storages/cookie";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";

export default function CalendarSectionTomorrowSchedule(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
        fetchTomorrowSchedule(today)
    }, [])

    const fetchTomorrowSchedule = (day) => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/schedule/tomorrow/${day}`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
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
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    }

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
            <div>
                <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Future <span className="text-main">Schedule</span></h1>
                <h4 className="fw-bold">Tommorow <span className="bg-danger rounded-pill px-3 text-white" style={{fontWeight:"500"}}>{items.tomorrow_day}</span></h4>
                <div className="row">
                    {
                        items.tomorrow && items.tomorrow.length > 0 ?
                            items.tomorrow.map((dt,idx) => {
                                return <div key={idx} className="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4">
                                    <OrganismsClothesHeader items={dt} type="schedule"/>
                                </div>
                            })
                        :
                            <span className="fst-italic">- No Schedule Clothes -</span>
                    }
                </div>
                <AtomsBreakLine length={1}/>
                <h4 className="fw-bold">Day after Tommorow <span className="bg-warning rounded-pill px-3 text-white" style={{fontWeight:"500"}}>{items.two_days_later_day}</span></h4>
                <div className="row">
                    {
                        items.two_days_later && items.two_days_later.length > 0 ?
                            items.two_days_later.map((dt,idx) => {
                                return <div key={idx} className="col-xxl-2 col-xl-3 col-lg-3 col-md-3 col-sm-4 col-4">
                                    <OrganismsClothesHeader items={dt} type="schedule"/>
                                </div>
                            })
                        :
                            <span className="fst-italic">- No Schedule Clothes -</span>
                    }
                </div>
            </div>
        );
    }
}
