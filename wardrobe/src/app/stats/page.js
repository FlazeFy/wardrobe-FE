"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import StatsSectionMostClothesCtx from "./sections/stats_most_clothes_ctx";
import StatsSectionSummary from "./sections/stats_summary";
import StatsYearlyActivity from "./sections/stats_yearly_activity";
import StatsMonthlyClothes from "./sections/stats_monthly_clothes";
import StatsSectionFilterMonthlyChart from "./sections/stats_filter_monthly_chart";
import { useState } from "react";
import StatsSectionMostUsedClothesDaily from "./sections/stats_most_used_clothes_daily";

export default function StatsPage() {
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)

    return (
        <main className={styles.main}>
            <OrganismsNavbar current="stats"/>
            <AtomsBreakLine length={3}/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="container-fluid custom-container">
                        <AtomsBreakLine length={1}/>
                        <h2 className="mb-0">Here you can see statistic, trends, and summary that are gather from your clothes's found in this apps</h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Stats</span> Page</h1>
                        <AtomsBreakLine length={1}/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center">
                    <div className="container-fluid custom-container">
                        <AtomsBreakLine length={1}/>
                        <StatsSectionSummary ctx="clothes_summary"/>
                        <AtomsBreakLine length={1}/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={1}/>
                    <div className="form-container" id="most_used_clothes_stats-section">
                        <div style={{maxWidth:"50vw"}}>
                            <h2 className="mb-0 fw-bold">Most Used Clothes</h2>
                            <h5 className="text-secondary">We analyze the most used clothes by its type, merk, size, colors, category, and type. The data is presented using Pie Chart and are limited to the 7 most used in each context</h5>
                        </div>
                        <AtomsBreakLine length={2}/>
                        <div className="row">
                            <StatsSectionMostClothesCtx ctx={"most_used_clothes_ctx"}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center" id="most_used_clothes_daily_per_clothes_type_list-section">
                    <AtomsBreakLine length={2}/>
                    <div className="form-container">
                        <div style={{maxWidth:"50vw"}}>
                            <h2 className="mb-0 fw-bold">Most Used Clothes Daily per Clothes Type</h2>
                            <h5 className="text-secondary">We analyze the most used clothes by day and per its clothes type. The list is clickable and you can directly navigate to the clothes detail</h5>
                        </div>
                        <AtomsBreakLine length={1}/>
                        <div className="row py-1">
                            <StatsSectionMostUsedClothesDaily/>
                        </div>
                    </div>
                </div>
            </div>

            <AtomsBreakLine length={2}/>
            <div className="container-fluid custom-container" style={{maxWidth:"50vw"}}>
                <h2 className="mb-0 fw-bold">Filter Chart</h2>
                <div className="d-flex justify-content-start">
                    <div>
                        <StatsSectionFilterMonthlyChart handleChange={(e) => setYear(e.target.value)} selectedYear={year}/>
                    </div>
                </div>
            </div>

            <AtomsBreakLine length={2}/>
            <div className="form-container" id="clothes_yearly_activity_stats-section">
                <div style={{maxWidth:"50vw"}}>
                    <h2 className="mb-0 fw-bold">Yearly Activity</h2>
                    <h5 className="text-secondary">We analyze the total activity for the last 365 days since today. You can the total for each date in this Heatmap</h5>
                </div>
                <div className="row">
                    <StatsYearlyActivity ctx={"yearly_activity"}/>
                </div>
            </div>

            <AtomsBreakLine length={2}/>
            <div className="form-container" id="clothes_monthly_activity_stats-section">
                <div style={{maxWidth:"50vw"}}>
                    <h2 className="mb-0 fw-bold">Clothes Monthly Activity</h2>
                    <h5 className="text-secondary">We analyze the total clothes you buy and total clothes you have added to our system based on selected year</h5>
                </div>
                <div className="row">
                    <StatsMonthlyClothes ctx="monthly_clothes_activity" year={year}/>
                </div>
            </div>
            <AtomsBreakLine length={1}/>

            <MoleculesFooter/>
        </main>
      );
}