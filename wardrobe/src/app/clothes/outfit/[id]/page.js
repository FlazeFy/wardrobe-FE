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
import MoleculesClothesStatus from "../../../../components/molecules/molecules_clothes_status";
import OutfitSectionUsedById from "./sections/outfit_used_by_id";
import OutfitSectionPostOutfitHistory from "./sections/outfit_post_outfit_history";
import OutfitDetailPostOutfitClothes from "./sections/outfit_post_outfit_clothes";
import OutfitSectionMonthlyTotalUsed from "./sections/outfit_monthly_total_used";

export default function ClothesOutfitPage({params, ...props}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchOutfit()
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
                })
                setError(error)
            }
        )
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
                    <div className="col-lg-7 col-md-6 col-sm-12 col-12">
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
                            
                            <p>{items.outfit_note ?? <span className="fst-italic">- No Description Provided -</span>}</p>
                            <AtomsBreakLine length={2}/>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <OutfitSectionPostOutfitHistory fetchOutfit={fetchOutfit} id={params.id}/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                    <OutfitDetailPostOutfitClothes fetchOutfit={fetchOutfit} id={params.id} selectedClothes={items.clothes}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <div className='row'>
                            {
                                items.clothes && items.clothes.length > 0 ?
                                    items.clothes.map((cl)=>{
                                        return (
                                            <div className='col-lg-4 col-md-4 col-sm-12 col-12 mx-auto'>
                                                <div className="px-3 py-2 text-center box-clothes">
                                                    <h6 className='mt-2 mb-1'>{cl.clothes_type} | {cl.clothes_name}</h6>
                                                    <img src={cl.clothes_image ?? "/images/footwear.png"} className="img-clothes img-fluid"/>
                                                    <MoleculesClothesStatus item={cl}/>
                                                    <p className='mb-0'>{cl.clothes_merk}</p>
                                                    <p className='mb-0 text-secondary'>{cl.clothes_desc}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                : 
                                    <span className="fst-italic text-secondary">- No Clothes Attached -</span>
                            }
                        </div>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-12 col-12">
                        <OutfitSectionUsedById fetchOutfit={fetchOutfit} id={params.id}/>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 col-12">
                        <OutfitSectionMonthlyTotalUsed id={params.id}/>
                    </div>
                </div>

                <MoleculesFooter/>
            </main>
        )
    }
}