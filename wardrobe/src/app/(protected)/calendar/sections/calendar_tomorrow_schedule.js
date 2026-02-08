"use client"
import OrganismsClothesHeader from "../../../../components/organisms/organisms_clothes_header"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box"
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline"
import fetchTomorrowSchedule from "@/modules/repositories/clothes_repository"

export default function CalendarSectionTomorrowSchedule(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' })
        Swal.showLoading()
        fetchTomorrowSchedule(
        today, 
        (result) => {
            setIsLoaded(true)
            setItems(result) 
        }, 
        (error) => {
            setError(error)
        })
    }, [])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div id="tomorrow_schedule-section">
                <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Future <span className="text-main">Schedule</span></h1>
                <h4 className="fw-bold">Tommorow <span className="bg-danger rounded-pill px-3 text-white" style={{fontWeight:"500"}}>{items.tomorrow_day}</span></h4>
                <div className="row" id="tomorrow_clothes-section">
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
                <div className="row" id="day_after_tomorrow_clothes-section">
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
        )
    }
}
