import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import UsedAllHistory from "./sections/used_all_history";

export default function ClothesUsed() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <AtomsBreakLine length={4}/>
                    <div className="d-flex justify-content-start">
                        <div className="me-4 pe-3">
                            <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="container-fluid custom-container">
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Used</span> History</h1>
                        <p>You can see past used history of the clothes, summary and also statistic of it!</p>
                    </div>
                    <AtomsBreakLine length={1}/>
                    <div className="form-container">
                        <h2 className="fw-bold">Used Summary</h2>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <h2 className="fw-bold">History Of Used</h2>
                    <UsedAllHistory/>
                </div>
            </div>

            <MoleculesFooter/>
        </main>
    )
}