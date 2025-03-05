import styles from "../../../page.module.css";
import OrganismsNavbar from "../../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../../components/molecules/molecules_footer";
import ClothesSectionAllDetail from "./sections/clothes_all_detail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ClothesByTable() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                        <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                    </div>
                    <div>
                        <h2 className="mb-0 fw-bold">Table View</h2>
                        <h5 className="text-secondary">In this format, you can see the detailed properties for many clothes at one time</h5>
                    </div>
                </div>
                <div>
                    <a className="btn btn-danger text-white" href={"/clothes/trash"}><FontAwesomeIcon icon={faTrash}/> Deleted Clothes</a>
                </div>
            </div>
            <AtomsBreakLine length={1}/>
            <ClothesSectionAllDetail ctx="clothes_all_detail"/>
            <MoleculesFooter/>
        </main>
    )
}