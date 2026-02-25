"use client"
import styles from "../../../../page.module.css"
import OrganismsNavbar from "../../../../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../../../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../../../../components/molecules/molecules_footer"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { convertDatetimeBasedLocal } from "../../../../../modules/helpers/converter"
import MoleculesAlertBox from "../../../../../components/molecules/molecules_alert_box"
import ClothesDetailEditForm from "./sections/clothes_detail_edit_form"
import ClothesDetailUsedHistory from "./sections/clothes_detail_used_history"
import ClothesDetailAddUsedHistory from "./sections/clothes_detail_add_used_history"
import ClothesDetailDeleteClothesById from "./sections/clothes_detail_delete"
import ClothesDetailSchedule from "./sections/clothes_detail_schedule"
import ClothesDetailAddSchedule from "./sections/clothes_detail_add_schedule"
import ClothesDetailSectionFoundedOutfit from "./sections/clothes_detail_founded_outfit"
import DetailSectionClothesHeader from "./sections/detail_clothes_header"
import { fetchClothesDetailByIDRepo } from "@/modules/repositories/clothes_repository"

export default function ClothesDetailPage({params}) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)

    useEffect(() => {
        fetchClothesDetail()
    },[])

    const fetchClothesDetail = () => {
        fetchClothesDetailByIDRepo(
            (response) => {
                setItem(response)
                finish()
            }, 
            (error) => {
                setError(error)
                finish()
            }, params.id
        )

        const finish = () => {
            setIsLoaded(true)
            Swal.close()
        }
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
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <DetailSectionClothesHeader items={item.detail} id={params.id} schedule={item.schedule}/>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <img src={item.detail.clothes_image ?? "/images/shoes_sample.jpg"} style={{maxWidth:"50%", minWidth:"100px"}} className="img img-fluid img-rounded d-block mx-auto"/>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>

                <AtomsBreakLine length={2}/>
                <div className="form-container">
                    <div style={{maxWidth:"50vw"}}>
                        <h2 className="mb-0 fw-bold">Edit Clothes</h2>
                        <h5 className="text-secondary">This clothes has been added to your wardrobe since {convertDatetimeBasedLocal(item.detail.created_at)}{item.detail.updated_at && <span>and the last update was detected on {convertDatetimeBasedLocal(item.detail.updated_at)}</span>}</h5>
                    </div>
                    <AtomsBreakLine length={1}/>
                    <ClothesDetailEditForm ctx="clothes_detail" item={item.detail}/>
                </div>
                <AtomsBreakLine length={1}/>

                <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-container" id="used_history-section">
                            <div style={{maxWidth:"50vw"}}>
                                <h2 className="mb-0 fw-bold">Used History</h2>
                                <h5 className="text-secondary">Start from <b>{convertDatetimeBasedLocal(item.last_used_history)}</b>, this clothes has been used for <b id="total_used-text">{item.total_used_history}</b> times. 
                                    <ClothesDetailAddUsedHistory fetchClothes={fetchClothesDetail} id={params.id} ctx="add_used_history" deleted_at={item.detail.deleted_at} with_button={true}/></h5>
                            </div>
                            <AtomsBreakLine length={1}/>
                            <ClothesDetailUsedHistory ctx="clothes_used_history" items={item.used_history} fetchClothes={fetchClothesDetail} is_deleted={item.detail.deleted_at ? true : false}/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-container" id="schedule-section">
                            <h2 className="mb-0 fw-bold">Schedule</h2>
                            <h5 className="text-secondary">You can set weekly schedule for a clothes, so we can remind you night before the day of use. 
                                    <ClothesDetailAddSchedule fetchClothes={fetchClothesDetail} id={params.id} ctx="add_schedule" deleted_at={item.detail.deleted_at}/></h5>
                            <ClothesDetailSchedule items={item.schedule} fetchClothes={fetchClothesDetail}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-container" id="outfit-section">
                            <h2 className="mb-0 fw-bold">Outfit</h2>
                            <h5 className="text-secondary">This clothes {item.outfit ? <span>has found in {item.outfit.length} outfit</span> : <span>doesn&apost have found in any outfit</span>}</h5>
                            <ClothesDetailSectionFoundedOutfit items={item.outfit}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <ClothesDetailDeleteClothesById id={params.id} type_delete={item.detail.deleted_at ? 'hard' : 'soft'} deleted_at={item.detail.deleted_at} clothes_name={item.detail.clothes_name} fetchClothes={fetchClothesDetail}/>
                    </div>
                </div>

                <MoleculesFooter/>
            </main>
        )
    }
}