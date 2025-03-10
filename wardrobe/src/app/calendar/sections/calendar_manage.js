"use client"
import OrganismsClothesCalendarManage from "../../../components/organisms/organisms_clothes_calendar_manage";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../components/molecules/molecules_alert_box";
import { getCookie } from "../../../modules/storages/cookie";

export default function CalendarSectionManage(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [isFetched, setIsFetched] = useState(false) // Track if data is fetched
    const tokenKey = getCookie("token_key")

    const fetchCalendar = () => {
        if (isFetched) return; // Prevent multiple API calls

        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/calendar/detail/date/${props.date}`, {
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
                setIsFetched(true) // Mark as fetched
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

    return (
        <>
            <button className="btn btn-warning w-100 mb-2" data-bs-target={`#manageCalendarModal_${props.date.replaceAll(' ','_')}`} data-bs-toggle="modal" onClick={fetchCalendar}><FontAwesomeIcon icon={faPenToSquare}/></button>
            <div className="modal fade" id={`manageCalendarModal_${props.date.replaceAll(' ','_')}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Manage Calendar for {props.date}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                error ? (
                                    <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
                                ) : !isLoaded ? (
                                    <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
                                ) : (
                                    items.used_history || items.weekly_schedule || items.wash_schedule || items.buyed_history || items.add_wardrobe ?
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <h5 className="mb-2">Used History</h5>
                                                {
                                                    items.used_history ?
                                                        items.used_history.map(dt => {
                                                            return <OrganismsClothesCalendarManage item={dt} type="used_history"/>
                                                        })
                                                    :
                                                        <span className="fst-italic">- No Clothes Used Found -</span>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <h5 className="mb-2">Weekly Schedule</h5>
                                                {
                                                    items.weekly_schedule ?
                                                        items.weekly_schedule.map(dt => {
                                                            return <OrganismsClothesCalendarManage item={dt} type="weekly_schedule"/>
                                                        })
                                                    :
                                                        <span className="fst-italic">- No Weekly Schedule Found -</span>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <h5 className="mb-2">Wash Schedule</h5>
                                                {
                                                    items.wash_schedule ?
                                                        items.wash_schedule.map(dt => {
                                                            return <OrganismsClothesCalendarManage item={dt} type="wash_schedule"/>
                                                        })
                                                    :
                                                        <span className="fst-italic">- No Wash Schedule Found -</span>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <h5 className="mb-2">Buyed History</h5>
                                                {
                                                    items.buyed_history ?
                                                        items.buyed_history.map(dt => {
                                                            return <OrganismsClothesCalendarManage item={dt} type="used_history"/>
                                                        })
                                                    :
                                                        <span className="fst-italic">- No Buyed History Found -</span>
                                                }
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                <h5 className="mb-2">Add Wardrobe</h5>
                                                {
                                                    items.add_wardrobe ?
                                                        items.add_wardrobe.map(dt => {
                                                            return <OrganismsClothesCalendarManage item={dt} type="add_wardrobe"/>
                                                        })
                                                    :
                                                        <span className="fst-italic">- No History Added Found -</span>
                                                }
                                            </div>                                            
                                        </div>
                                    :
                                        <span className="fst-italic">- No Clothes Found On this Date -</span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

