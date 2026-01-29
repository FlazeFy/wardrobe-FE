import styles from "../page.module.css"
import OrganismsNavbar from "../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../components/molecules/molecules_footer"
import AboutSectionCreator from "./sections/about_creator"
import AboutSectionApps from "./sections/about_apps"

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="about"/>
            <AtomsBreakLine length={3}/>
            <div style={{width:"760px"}} className="container custom-container text-center mx-auto">
                <AboutSectionApps/>
            </div>
            <AtomsBreakLine length={2}/>
            <div style={{width:"760px"}} className="container custom-container text-center mx-auto">
                <AboutSectionCreator/>
            </div>
            <AtomsBreakLine length={2}/>
            <MoleculesFooter/>
        </main>
    )
}