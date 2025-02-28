"use client"
import { useEffect, useState } from "react";
import { getCookie } from "../modules/storages/cookie";
import AtomsBreakLine from "../components/atoms/atoms_breakline";
import MoleculesFooter from "../components/molecules/molecules_footer";
import MoleculesSectionDivider from "../components/molecules/molecules_section_divider";
import OrganismsNavbar from "../components/organisms/organisms_navbar";
import styles from "./page.module.css";
import LandingFeedback from "./sections/landing_feedback";
import LandingSectionLastOutfit from "./sections/landing_last_outift";
import LandingSectionWelcoming from "./sections/landing_welcoming";
import LandingSectionLogin from "./sections/landing_login";
import LandingSectionPlatform from "./sections/landing_platform";
import LandingSectionFeatures from "./sections/landing_features";

export default function Home() {
  const [tokenKey, setTokenKey] = useState(null);
  useEffect(() => {
      setTokenKey(getCookie('token_key'))
  }, [])

  return (
    <main className={styles.main}>
      <OrganismsNavbar current=""/>
      <LandingSectionWelcoming/>
      <MoleculesSectionDivider/>
      {
        tokenKey ? <LandingSectionLastOutfit/> : <LandingSectionLogin ctx="login"/>
      }
      <MoleculesSectionDivider/>
      <LandingFeedback/>
      <MoleculesSectionDivider/>
      <LandingSectionPlatform/>
      <MoleculesSectionDivider/>
      <LandingSectionFeatures/>
      <AtomsBreakLine length={4}/>
      <MoleculesFooter/>
    </main>
  );
}
