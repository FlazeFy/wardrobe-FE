import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import StatsSectionMostClothesCtx from "./sections/stats_most_clothes_ctx";
import StatsSectionSummary from "./sections/stats_summary";
import StatsYearlyActivity from "./sections/stats_yearly_activity";
import StatsMonthlyClothes from "./sections/stats_monthly_clothes";

export default function StatsPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={3}/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={2}/>
                    <h2 className="mb-0">Here you can see statistic, trends, and summary that are gather from your clothes's found in this apps</h2>
                    <hr></hr>
                    <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Stats Page</h1>
                    <AtomsBreakLine length={2}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={2}/>
                    <AtomsBreakLine length={2}/>
                    <StatsSectionSummary ctx="clothes_summary"/>
                </div>
            </div>
            
            <AtomsBreakLine length={2}/>
            <div style={{maxWidth:"50vw"}}>
                <h2 className="mb-0 fw-bold">Most Used Clothes</h2>
                <h5 className="text-secondary">We analyze the most used clothes by its type, merk, size, colors, category, and type. The data is presented using Pie Chart and are limited to the 7 most used in each context</h5>
            </div>
            <div className="row">
                <StatsSectionMostClothesCtx ctx={"most_used_clothes_ctx"}/>
            </div>
            <AtomsBreakLine length={1}/>

            <AtomsBreakLine length={2}/>
            <div style={{maxWidth:"50vw"}}>
                <h2 className="mb-0 fw-bold">Yearly Activity</h2>
                <h5 className="text-secondary">We analyze the total activity for the last 365 days since today. You can the total for each date in this Heatmap</h5>
            </div>
            <div className="row">
                <StatsYearlyActivity ctx={"yearly_activity"}/>
            </div>
            <AtomsBreakLine length={1}/>

            <AtomsBreakLine length={2}/>
            <div style={{maxWidth:"50vw"}}>
                <h2 className="mb-0 fw-bold">Clothes Monthly Activity</h2>
                <h5 className="text-secondary">We analyze the total clothes you buy and total clothes you have added to our system based on selected year</h5>
            </div>
            <div className="row">
                <StatsMonthlyClothes ctx="monthly_clothes_activity"/>
            </div>
            <AtomsBreakLine length={1}/>

            <MoleculesFooter/>
        </main>
      );
}