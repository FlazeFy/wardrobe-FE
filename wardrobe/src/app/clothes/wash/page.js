import styles from "../../page.module.css"
import OrganismsNavbar from "../../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../../components/molecules/molecules_footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import WashSectionAllHistory from "./sections/wash_all_history"
import ClothesSectionUnfinishedWash from "../sections/check_unfinished_wash"
import WashSectionSummary from "./sections/wash_summary"
import Link from "next/link"

export default function ClothesWash() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <AtomsBreakLine length={4}/>
                    <div className="d-flex justify-content-start">
                        <div className="me-4 pe-3">
                            <Link href="/clothes">
                                <button className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/></button>
                            </Link>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="container-fluid custom-container">
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Wash</span> History</h1>
                        <p>You can track all wash progress, see history wash clothes, and plan for the next wash schedule</p>
                    </div>
                    <ClothesSectionUnfinishedWash source="wash_page"/>
                    <AtomsBreakLine length={1}/>
                    <div className="form-container" id="wash_summary-section">
                        <h2 className="fw-bold">Wash Summary</h2>
                        <WashSectionSummary/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12" id="history_of_wash_list-section">
                    <h2 className="fw-bold">History Of Wash</h2>
                    <WashSectionAllHistory/>
                </div>
            </div>

            <MoleculesFooter/>
        </main>
    )
}