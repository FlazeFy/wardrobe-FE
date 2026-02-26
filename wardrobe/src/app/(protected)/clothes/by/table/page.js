import styles from "../../../../page.module.css"
import OrganismsNavbar from "../../../../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../../../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../../../../components/molecules/molecules_footer"
import ClothesSectionAllDetail from "./sections/clothes_all_detail"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function ClothesByTable() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                        <Link href="/clothes">
                            <button className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/></button>
                        </Link>
                    </div>
                    <div>
                        <h2 className="mb-0 fw-bold">Table View</h2>
                        <h5 className="text-secondary">In this format, you can see the detailed properties for many clothes at one time</h5>
                    </div>
                </div>
                <div>
                    <Link href="/clothes/trash">
                        <button className="btn btn-danger text-white"><FontAwesomeIcon icon={faTrash}/> Deleted Clothes</button>
                    </Link>
                </div>
            </div>
            <AtomsBreakLine length={1}/>
            <ClothesSectionAllDetail ctx="clothes_all_detail"/>
            <MoleculesFooter/>
        </main>
    )
}