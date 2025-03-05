"use client"
import styles from "../../page.module.css";
import OrganismsNavbar from "../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../components/molecules/molecules_footer";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClothesAddForm from "./sections/clothes_add_form";

export default function ClothesAddPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="clothes"/>
            <AtomsBreakLine length={2}/>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={4}/>
                    <div className="d-flex justify-content-start">
                        <div className="me-4 pe-3">
                            <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="container-fluid custom-container">
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Add</span> Clothes</h1>
                        <p>Here you can add your clothes to your Wardrobe inventory. Start monitoring and make this outfit part of your daily outfit</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={2}/>
                    <AtomsBreakLine length={2}/>
                </div>
            </div>

            <AtomsBreakLine length={2}/>
            <div className="form-container">
                <h2 className="fw-bold">Add Form</h2>
                <ClothesAddForm/>
            </div>

            <MoleculesFooter/>
        </main>
    )
}