import styles from "../../../page.module.css";
import OrganismsNavbar from "../../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../../components/molecules/molecules_footer";
import ClothesSectionAllDetail from "./sections/clothes_all_detail";

export default function ClothesByTable(props) {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={2}/>
            <div>
                <h2 className="mb-0 fw-bold">Table View</h2>
                <h5 className="text-secondary">In this format, you can see the detailed properties for many clothes at one time</h5>
            </div>
            <AtomsBreakLine length={1}/>
            <ClothesSectionAllDetail ctx="clothes_all_detail"/>
            <MoleculesFooter/>
        </main>
    )
}