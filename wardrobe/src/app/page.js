import AtomsBreakLine from "../components/atoms/atoms_breakline";
import MoleculesFooter from "../components/molecules/molecules_footer";
import MoleculesSectionDivider from "../components/molecules/molecules_section_divider";
import OrganismsNavbar from "../components/organisms/organisms_navbar";
import styles from "./page.module.css";
import LandingFeedback from "./sections/landing_feedback";
import LandingSectionLastOutfit from "./sections/landing_last_outift";
import LandingSectionWelcoming from "./sections/landing_welcoming";

export default function Home() {
  return (
    <main className={styles.main}>
      <OrganismsNavbar/>
      <LandingSectionWelcoming/>
      <MoleculesSectionDivider/>
      <LandingSectionLastOutfit/>
      <MoleculesSectionDivider/>
      <LandingFeedback/>
      <AtomsBreakLine length={4}/>
      <MoleculesFooter/>
    </main>
  );
}
