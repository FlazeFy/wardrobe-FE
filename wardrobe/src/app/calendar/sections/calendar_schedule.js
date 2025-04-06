"use client"
import OrganismsClothesHeader from "../../../components/organisms/organisms_clothes_header";
import { faPenToSquare, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../components/molecules/molecules_alert_box";
import { getCookie } from "../../../modules/storages/cookie";
import CalendarSectionExportDailyData from "./calendar_export_daily_data";
import CalendarSectionManage from "./calendar_manage";

export default function CalendarSectionSchedule(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const { month_year } = props
    const [month, year] = month_year.split('-').map(Number)
    const [today, setToday] = useState() 
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchCalendar()
    }, [month_year])

    const fetchCalendar = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/stats/calendar/${month}/${year}`, {
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

                const currentDate = new Date()
                const formattedDate = currentDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });
                setToday(formattedDate)
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

    const getDatesForMonth = (month, year) => {
        const dates = [];
        const daysInMonth = new Date(year, month, 0).getDate()
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day)
            const formattedDate = date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });
            dates.push({ formattedDate, dayOfWeek: date.getDay() })
        }
        return dates;
    };

    const dates = getDatesForMonth(month, year);

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
            <table className='table table-bordered' id="calendar-table">
                <thead>
                    <tr>
                        <th style={{ width: '120px' }}>Date</th>
                        <th style={{ width: "17.25%" }}>Used History</th>
                        <th style={{ width: "17.25%" }}>Weekly Schedule</th>
                        <th style={{ width: "17.25%" }}>Wash Schedule</th>
                        <th style={{ width: "17.25%" }}>Buyed History</th>
                        <th style={{ width: "17.25%" }}>Add to Wardrobe</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td className={`text-center ${today == item.date ? 'bg-highlight':''}`} style={{fontSize:"var(--textXMD)"}}>{ item.date }</td>
                                {
                                    ['used_history', 'weekly_schedule', 'wash_schedule', 'buyed_history', 'add_wardrobe'].map((key) => (
                                        <td key={key} className={today == item.date ? 'bg-highlight':''}>
                                            <div className="row">
                                                {
                                                    item[key] ? (
                                                    item[key].map((dt, idx) => (
                                                        <div key={idx} className="col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <OrganismsClothesHeader items={dt} type="schedule" />
                                                        </div>
                                                    )
                                                )
                                                ) : ( <></> )}
                                            </div>
                                        </td>
                                    ))
                                }
                                <td className={today == item.date ? 'bg-highlight':''}>
                                    <CalendarSectionManage date={item.date}/>
                                    <CalendarSectionExportDailyData date={item.date}/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        );
    }
}
