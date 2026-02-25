"use client"
import styles from "../../page.module.css"
import OrganismsNavbar from "../../../components/organisms/organisms_navbar"
import AtomsBreakLine from "../../../components/atoms/atoms_breakline"
import MoleculesFooter from "../../../components/molecules/molecules_footer"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import MoleculesAlertBox from "../../../components/molecules/molecules_alert_box"
import ProfileSectionEditForm from "./sections/profile_edit_form"
import ProfileSectionAllHistory from "./sections/profile_all_history"
import ProfileSectionExportData from "./sections/profile_export_data"
import ProfileSectionSendQuestion from "./sections/profile_post_question"
import ProfileSectionSignOut from "./sections/profile_sign_out"
import ProfileSectionPropsProfile from "./sections/profile_props_profile"
import { fetchMyProfileRepo } from "@/modules/repositories/user_repository"

export default function ProfilePage(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetchMyProfileRepo(
            (result) => {
                setItems(result)  
                finish()
            },
            (error) => {
                setError(error)
                finish()
            }
        )

        const finish = () => {
            setIsLoaded(true)
            Swal.close()
        }
    },[])

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
                <OrganismsNavbar current="profile"/>
                <AtomsBreakLine length={3}/>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="container-fluid custom-container">
                            <AtomsBreakLine length={1}/>
                            <h2 className="mb-0">Here you can see and modify your account, sync to Telegram account, and sign out from your account</h2>
                            <hr></hr>
                            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Profile</span> Page</h1>
                            <AtomsBreakLine length={1}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex flex-column justify-content-center">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                <ProfileSectionSignOut/>
                            </div>
                        </div>
                        <AtomsBreakLine length={1}/>
                        <div className="container-fluid custom-container">
                            <ProfileSectionPropsProfile created_at={items.created_at} updated_at={items.updated_at}/>
                            <AtomsBreakLine length={1}/>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={1}/>
                        <div className="form-container">
                            <ProfileSectionEditForm item={items}/>
                        </div>
                        <AtomsBreakLine length={2}/>
                        <div className="form-container" id="export_data-section">
                            <ProfileSectionExportData/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={1}/>
                        <div className="form-container">
                            <ProfileSectionAllHistory ctx="all_history"/>
                        </div>
                        <AtomsBreakLine length={2}/>
                        <div className="form-container" id="send_question-section">
                            <ProfileSectionSendQuestion/>
                        </div>
                    </div>
                </div>
                
                <MoleculesFooter/>
            </main>
        )
    }
}