import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import GeneratedSectionRandomOutift from "./sections/generated_random_outfit";
import GeneratedSectionShowAllOutfit from "./sections/generated_show_all_outfit";
import GeneratedSectionOutfitMonthlyTotalUsed from "./sections/generated_outfit_monthly_total_used";

export default function GeneratedPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={3}/>
            <GeneratedSectionRandomOutift/>
            <AtomsBreakLine length={3}/>
            <GeneratedSectionOutfitMonthlyTotalUsed/>
            <AtomsBreakLine length={5}/>
            <GeneratedSectionShowAllOutfit ctx={"all_outfit"}/>
            <MoleculesFooter/>
        </main>
      );
}