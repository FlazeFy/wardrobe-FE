import styles from "../page.module.css"
import OrganismsNavbar from "../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../components/molecules/molecules_footer"
import { faArrowRight,  faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ClothesSectionAllHeader from "./sections/clothes_all_header"
import ClothesSectionTotalByType from "./sections/total_clothes_by_type"
import ClothesCheckSchedule from "./sections/clothes_check_schedule"
import ClothesSectionUnfinishedWash from "./sections/check_unfinished_wash"
import Link from "next/link"

export default function ClothesPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column">
                    <div className="container-fluid custom-container flex-grow-1 mt-4">
                        <AtomsBreakLine length={1} />
                        <h2 className="mb-0">
                            In this page, you will see all of your inventory in catalog view. Do you want to see the 
                            <a className="btn btn-primary ms-2"><FontAwesomeIcon icon={faArrowRight} /> Category View</a> or 
                            <Link href="/clothes/generated">
                                <button className="btn btn-primary ms-2"><FontAwesomeIcon icon={faArrowRight} /> Generated Outfit</button>
                            </Link>
                        </h2>
                        <hr/>
                        <h1 className="mb-0" style={{ fontSize: "74px", fontWeight: "800" }}><span className="text-main">Clothes</span> Page</h1>
                        <AtomsBreakLine length={1} />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column">
                    <div className="row h-100">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-stretch">
                            <div className="container custom-container flex-grow-1">
                                <ClothesSectionTotalByType ctx="total_clothes_by_type" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center">
                            <Link href="/clothes/used">
                                <button className="btn btn-navigate-menu-custom text-start" id="used_clothes_btn">
                                    <h2 style={{fontWeight:"800"}}><span className="text-main">Used</span> History</h2>
                                    <p>Wanna see the used history of all your clothes? so you can decide the next clothes to use</p>
                                    <AtomsBreakLine length={1} />
                                </button>
                            </Link>
                            <AtomsBreakLine length={1} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-stretch">
                            <Link href="/clothes/add">
                                <button className="btn btn-navigate-menu-custom text-start" id="add_clothes_btn">
                                    <h2 style={{fontWeight:"800"}}>Add <span className="text-main">Clothes</span></h2>
                                    <p>You have a new clothes? and want to monitoring or set schedule on it? Add to Wardrobe Now!</p>
                                </button>
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-stretch">
                            <Link href="/clothes/wash">
                                <button className="btn btn-navigate-menu-custom text-start" id="wash_clothes_btn">
                                    <h2 style={{fontWeight:"800"}}><span className="text-main">Wash</span> History</h2>
                                    <p>See past wash history, on-going wash, or plan for the next days</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ClothesSectionUnfinishedWash source="clothes_page"/>
            <AtomsBreakLine length={2}/>
            <div className="d-flex justify-content-between">
                <div>
                    <h2 className="mb-0 fw-bold">All Clothes</h2>
                    <h5 className="text-secondary">For more detail you can see the 
                        <Link href="/clothes/by/table">
                            <button className="btn btn-primary mx-2"><FontAwesomeIcon icon={faArrowRight}/> Table View</button>
                        </Link>
                    </h5>
                </div>
                <div>
                    <Link href="/clothes/trash">
                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash}/> Deleted Clothes</button>
                    </Link>
                </div>
            </div>
            <AtomsBreakLine length={1}/>
            <ClothesCheckSchedule ctx="check_schedule"/>
            <AtomsBreakLine length={1}/>
            <ClothesSectionAllHeader ctx="all_header"/>
            <AtomsBreakLine length={1}/>

            <MoleculesFooter/>
        </main>
    )
}