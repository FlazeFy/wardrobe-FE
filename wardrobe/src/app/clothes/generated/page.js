import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import GeneratedSectionRandomOutift from "./sections/generated_random_outfit";

export default function GeneratedPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={1}/>
            <GeneratedSectionRandomOutift/>
            <MoleculesFooter/>
        </main>
      );
}