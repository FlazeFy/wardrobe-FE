import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import AboutSectionCreator from "./sections/about_creator";
import AboutSectionApps from "./sections/about_apps";

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={1}/>
            <div style={{width:"760px"}} className="text-center mx-auto">
                <AboutSectionApps/>
                <AtomsBreakLine length={3}/>
                <AboutSectionCreator/>
            </div>
            <MoleculesFooter/>
        </main>
      );
}