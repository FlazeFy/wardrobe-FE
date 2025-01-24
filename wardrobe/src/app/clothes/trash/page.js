import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ClothesSectionAllDeletedClothes from "./sections/trash_all_deleted_clothes";

export default function ClothesTrash() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="d-flex justify-content-start">
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                </div>
                <div>
                    <h2 className="mb-0 fw-bold">Trash Page</h2>
                    <h5 className="text-secondary">All deleted clothes still can be recovered until 30 days after it got deleted. After that it will permanentally deleted</h5>
                </div>
            </div>
            <ClothesSectionAllDeletedClothes/>
            <MoleculesFooter/>
        </main>
    )
}