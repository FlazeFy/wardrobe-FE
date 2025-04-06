import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import GeneratedSectionRandomOutift from "./sections/generated_random_outfit";
import GeneratedSectionShowAllOutfit from "./sections/generated_show_all_outfit";
import GeneratedSectionOutfitMonthlyTotalUsed from "./sections/generated_outfit_monthly_total_used";
import GeneratedSectionOutfitMostUsed from "./sections/generated_outfit_most_used";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneratedSectionSummary from "./sections/generated_summary";

export default function GeneratedPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={3}/>
            <div className="mx-auto mb-3 w-100 d-flex justify-content-start" style={{maxWidth:"1280px"}}>
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/></a>
                </div>
                <GeneratedSectionSummary/>
            </div>
            <GeneratedSectionRandomOutift/>
            <AtomsBreakLine length={3}/>
            <GeneratedSectionOutfitMostUsed/>
            <AtomsBreakLine length={3}/>
            <GeneratedSectionOutfitMonthlyTotalUsed/>
            <AtomsBreakLine length={5}/>
            <GeneratedSectionShowAllOutfit ctx={"all_outfit"}/>
            <MoleculesFooter/>
        </main>
      );
}