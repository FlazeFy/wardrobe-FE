"use client"
import styles from "../../../page.module.css";
import OrganismsNavbar from "../../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../../components/molecules/molecules_footer";
import { useEffect, useState } from "react";
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../../../../modules/storages/cookie";
import Swal from "sweetalert2";
import { convertDatetimeBasedLocal } from "../../../../modules/helpers/converter";
import OutfitSectionUsedById from "./sections/outfit_used_by_id";
import OutfitSectionPostOutfitHistory from "./sections/outfit_post_outfit_history";
import OutfitDetailPostOutfitClothes from "./sections/outfit_post_outfit_clothes";
import OutfitSectionMonthlyTotalUsed from "./sections/outfit_monthly_total_used";
import OutfitSectionAttachedClothes from "./sections/outfit_attached_clothes";

export default function ClothesOutfitPage({params, ...props}) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [usedHistoryItems, setUsedHistoryItems] = useState(null)
    const [usedHistoryMaxPage, setUsedHistoryMaxPage] = useState(0)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchOutfit()
        fetchAllHistory()
    },[])

    const fetchOutfit = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/by/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)
                setItems(result.data)  
            },
            (error) => {
                setIsLoaded(true)
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            }
        )
    }

    const fetchAllHistory = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/${params.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenKey}`, 
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.status)
            }
            return res.json()
        })
        .then((result) => {
            Swal.close()
            setIsLoaded(true)
            setUsedHistoryItems(result.data.data)
            setUsedHistoryMaxPage(result.data.last_page)
        })
        .catch((error) => {
            Swal.close()
            if (error.message != 404) {
                setError(error)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                });
            } else {
                setIsLoaded(true)
            }
        });
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <main className={styles.main}>
                <OrganismsNavbar current="clothes"/>
                <AtomsBreakLine length={2}/>
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <div className="d-flex justify-content-start">
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                            </div>
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <h2 className="mb-0">Outfit Name</h2>
                                <h4 className="mb-0 text-secondary">{items.outfit_name}</h4>
                            </div>
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <h2 className="mb-0">Total Used</h2>
                                <h4 className="mb-0 text-secondary">{items.total_used}</h4>
                            </div>
                            <div className="me-4 pe-3">
                                <h2 className="mb-0">Last Used</h2>
                                <h4 className="mb-0 text-secondary">{items.last_used ? convertDatetimeBasedLocal(items.last_used) : <span>-</span>}</h4>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="container-fluid custom-container">
                            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>{items.outfit_name}</h1>   
                            <p className="outfit-note">{items.outfit_note ?? <span className="fst-italic">- No Description Provided -</span>}</p>
                            <AtomsBreakLine length={2}/>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <OutfitSectionPostOutfitHistory fetchOutfit={fetchOutfit} fetchAllHistory={fetchAllHistory} id={params.id}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <OutfitDetailPostOutfitClothes fetchOutfit={fetchOutfit} id={params.id} selectedClothes={items.clothes}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 col-12" id="attached_clothes-section">
                        <AtomsBreakLine length={2}/>
                        <OutfitSectionAttachedClothes items={items.clothes}/>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="form-container" id="used_history-section">
                            <OutfitSectionUsedById fetchOutfit={fetchOutfit} fetchAllHistory={fetchAllHistory} id={params.id} items={usedHistoryItems}/>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="form-container" id="total_used_outfit_per_month_stats-section">
                            <OutfitSectionMonthlyTotalUsed id={params.id}/>
                        </div>
                    </div>
                </div>

                <MoleculesFooter/>
            </main>
        )
    }
}