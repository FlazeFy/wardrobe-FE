"use client"
import styles from "../../../page.module.css";
import OrganismsNavbar from "../../../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../../../components/molecules/molecules_footer";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCleanTitleFromCtx } from "../../../../modules/helpers/converter";
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box";
import ClothesDetailEditForm from "./sections/clothes_detail_edit_form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClothesDetailUsedHistory from "./sections/clothes_detail_used_history";
import ClothesDetailAddUsedHistory from "./sections/clothes_detail_add_used_history";
import ClothesDetailDeleteClothesById from "./sections/clothes_detail_delete";
import ClothesDetailSchedule from "./sections/clothes_detail_schedule";
import ClothesDetailAddSchedule from "./sections/clothes_detail_add_schedule";
import { getCookie } from "../../../../modules/storages/cookie";
import ClothesDetailSectionFoundedOutfit from "./sections/clothes_detail_founded_outfit";
import ClothesDetailCheckDeleted from "./sections/clothes_detail_check_deleted";
import ClothesDetailCheckSchedule from "./sections/clothes_detail_check_schedule";
import ClothesDetailSectionExportData from "./sections/clothes_detail_export_data";

export default function ClothesDetailPage({params}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchClothes()
    },[])

    const fetchClothes = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/detail/${params.id}`, {
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
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <div className="d-flex justify-content-start">
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <a href="/clothes" className="btn btn-danger h-100 pt-3"><FontAwesomeIcon icon={faArrowLeft} size={"xl"}/> </a>
                            </div>
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <h2 className="mb-0">Category</h2>
                                <h4 className="mb-0 text-secondary">{getCleanTitleFromCtx(items.detail.clothes_category)}</h4>
                            </div>
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <h2 className="mb-0">Type</h2>
                                <h4 className="mb-0 text-secondary">{items.detail.clothes_type}</h4>
                            </div>
                            <div>
                                <h2 className="mb-0">Size</h2>
                                <h4 className="mb-0 text-secondary">{items.detail.clothes_size}</h4>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="container-fluid custom-container">
                            <ClothesDetailSectionExportData id={params.id}/>
                            <hr></hr>
                            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>{items.detail.clothes_name}</h1>
                            <ClothesDetailCheckDeleted items={items.detail.deleted_at}/>
                            <ClothesDetailCheckSchedule items={items.schedule}/>
                            <p>{items.detail.clothes_desc}</p>
                            <AtomsBreakLine length={2}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <img src={items.detail.clothes_image ?? "/images/shoes_sample.jpg"} style={{maxWidth:"50%", minWidth:"100px"}} className="img img-fluid img-rounded d-block mx-auto"/>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>

                <AtomsBreakLine length={2}/>
                <div className="form-container">
                    <div style={{maxWidth:"50vw"}}>
                        <h2 className="mb-0 fw-bold">Edit Clothes</h2>
                        <h5 className="text-secondary">This clothes has been added to your wardrobe since {items.detail.created_at}{items.detail.updated_at && <span>and the last update was detected on {items.detail.updated_at}</span>}</h5>
                    </div>
                    <AtomsBreakLine length={1}/>
                    <ClothesDetailEditForm ctx="clothes_detail" item={items.detail}/>
                </div>
                <AtomsBreakLine length={1}/>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-container">
                            <div style={{maxWidth:"50vw"}}>
                                <h2 className="mb-0 fw-bold">Used History</h2>
                                <h5 className="text-secondary">Start from <b>{items.last_used_history}</b>, this clothes has been used for <b>{items.total_used_history}</b> times. 
                                    <ClothesDetailAddUsedHistory fetchClothes={fetchClothes} id={params.id} ctx="add_used_history" deleted_at={items.detail.deleted_at} with_button={true}/></h5>
                            </div>
                            <AtomsBreakLine length={1}/>
                            <ClothesDetailUsedHistory ctx="clothes_used_history" items={items.used_history} fetchClothes={fetchClothes}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-container">
                            <h2 className="mb-0 fw-bold">Schedule</h2>
                            <h5 className="text-secondary">You can set weekly schedule for a clothes, so we can remind you night before the day of use. 
                                    <ClothesDetailAddSchedule fetchClothes={fetchClothes} id={params.id} ctx="add_schedule" deleted_at={items.detail.deleted_at}/></h5>
                            <ClothesDetailSchedule items={items.schedule} fetchClothes={fetchClothes}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-container">
                            <h2 className="mb-0 fw-bold">Outfit</h2>
                            <h5 className="text-secondary">This clothes {items.outfit ? <span>has found in {items.outfit.length} outfit</span> : <span>doesn't have found in any clothes</span>}</h5>
                            <ClothesDetailSectionFoundedOutfit items={items.outfit}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <ClothesDetailDeleteClothesById id={params.id} type_delete={items.detail.deleted_at ? 'hard' : 'soft'} deleted_at={items.detail.deleted_at} clothes_name={items.detail.clothes_name} fetchClothes={fetchClothes}/>
                    </div>
                </div>

                <MoleculesFooter/>
            </main>
        )
    }
}