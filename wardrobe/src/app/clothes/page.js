import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import { faArrowRight, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClothesSectionAllHeader from "./sections/clothes_all_header";
import ClothesSectionTotalByType from "./sections/total_clothes_by_type";
import ClothesCheckSchedule from "./sections/clothes_check_schedule";

export default function ClothesPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={2}/>
                    <h2 className="mb-0">In this page, you will see all of your inventory in catalog view. Do you want to see the <a className="btn btn-link"><FontAwesomeIcon icon={faArrowRight}/> Category View</a> or <a className="btn btn-link" href="/clothes/generated"><FontAwesomeIcon icon={faArrowRight}/> Generated Outfit</a></h2>
                    <hr></hr>
                    <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Clothes Page</h1>
                    <AtomsBreakLine length={2}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={3}/>
                    <ClothesSectionTotalByType ctx="total_clothes_by_type"/>
                    <AtomsBreakLine length={2}/>
                </div>
            </div>
            <AtomsBreakLine length={2}/>
            <div className="d-flex justify-content-between">
                <div>
                    <h2 className="mb-0 fw-bold">All Clothes</h2>
                    <h5 className="text-secondary">For more detail you can see the 
                        <a className="btn btn-link mx-2" href={"/clothes/by/table"}><FontAwesomeIcon icon={faArrowRight}/> Table View</a>
                        <a className="btn btn-link bg-danger text-white" href={"/clothes/trash"}><FontAwesomeIcon icon={faTrash}/> Deleted Clothes</a>
                    </h5>
                </div>
                <div>
                    <a className="btn btn-success" href={"/clothes/add"}><FontAwesomeIcon icon={faPlus}/> Add New Clothes</a>
                </div>
            </div>
            <AtomsBreakLine length={1}/>
            <ClothesCheckSchedule ctx="check_schedule"/>
            <AtomsBreakLine length={1}/>
            <ClothesSectionAllHeader ctx="all_header"/>
            <AtomsBreakLine length={1}/>

            <MoleculesFooter/>
        </main>
      );
}