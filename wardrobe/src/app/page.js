"use client"
import { useEffect, useState } from "react"
import { getLocal } from "../modules/storages/local"
import AtomsBreakLine from "../components/atoms/atoms_breakline"
import MoleculesFooter from "../components/molecules/molecules_footer"
import MoleculesSectionDivider from "../components/molecules/molecules_section_divider"
import OrganismsNavbar from "../components/organisms/organisms_navbar"
import styles from "./page.module.css"
import LandingFeedback from "./sections/landing_feedback"
import LandingSectionLastOutfit from "./sections/landing_last_outift"
import LandingSectionWelcoming from "./sections/landing_welcoming"
import LandingSectionLogin from "./sections/landing_login"
import LandingSectionPlatform from "./sections/landing_platform"
import LandingSectionFeatures from "./sections/landing_features"
import LandingSectionFAQ from "./sections/landing_faq"

export default function Home() {
  const [tokenKey, setTokenKey] = useState(null)

  useEffect(() => {
      setTokenKey(getLocal('token_key'))
  }, [])

  return (
    <main className={styles.main}>
      <OrganismsNavbar current=""/>
      <div className="row mt-5">
        <div className="col-12 order-3 order-sm-1">
          <LandingSectionWelcoming/>
        </div>
        <div className="col-12 order-2">
          <MoleculesSectionDivider/>
        </div>
        <div className="col-12 order-1 order-sm-3">
          {
            tokenKey ? <LandingSectionLastOutfit/> : <LandingSectionLogin ctx="login"/>
          }
        </div>
      </div>
      <MoleculesSectionDivider/>
      <LandingSectionFeatures/>
      <MoleculesSectionDivider/>
      <LandingSectionPlatform/>
      <MoleculesSectionDivider/>
      <LandingFeedback/>
      <MoleculesSectionDivider/>
      <LandingSectionFAQ/>
      <AtomsBreakLine length={4}/>
      <MoleculesFooter/>
    </main>
  )
}
