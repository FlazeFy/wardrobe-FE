"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import CalendarSectionSchedule from "./sections/calendar_schedule";
import CalendarSectionMonthYear from "./sections/calendar_month_year";
import { useState } from "react";
import { getCurrentMonthYear } from "../../modules/helpers/generator";
import CalendarSectionExportData from "./sections/calendar_export_data";
import CalendarSectionTomorrowSchedule from "./sections/calendar_tomorrow_schedule";

export default function CalendarPage() {
    const [monthYear, setMonthYear] = useState(getCurrentMonthYear()) 
    const handleMonthYearChange = (val) => {
        setMonthYear(val)
    };

    return (
        <main className={styles.main}>
            <OrganismsNavbar current="calendar"/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center">
                    <div className="container-fluid custom-container">
                        <AtomsBreakLine length={1}/>
                        <h2 className="mb-0">In this page, here we present your clothes used history, weekly schedule, wash schedule, and buyed history for every day in a month</h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Calendar</span> Page</h1>
                        <div className="d-flex justify-content-start">
                            <CalendarSectionMonthYear defaultValue={monthYear} onChange={handleMonthYearChange}/>
                            <CalendarSectionExportData year={monthYear.split('-')[1]}/>
                        </div>
                        <AtomsBreakLine length={1}/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex flex-column">
                    <div className="container-full custom-container flex-grow-1">
                        <CalendarSectionTomorrowSchedule/>
                    </div>
                </div>
            </div>
            <AtomsBreakLine length={1}/>
            <CalendarSectionSchedule ctx="calendar_schedule" month_year={monthYear}/>
            <MoleculesFooter/>
        </main>
    );
}