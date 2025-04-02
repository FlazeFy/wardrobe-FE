"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";
import ProfileSectionEditForm from "./sections/profile_edit_form";
import { getCookie } from "../../modules/storages/cookie";
import ProfileSectionAllHistory from "./sections/profile_all_history";
import ProfileSectionExportData from "./sections/profile_export_data";
import ProfileSectionSendQuestion from "./sections/profile_post_question";
import ProfileSectionSignOut from "./sections/profile_sign_out";
import ProfileSectionPropsProfile from "./sections/profile_props_profile";

export default function ProfilePage(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchProfile()
    },[])

    const fetchProfile = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/user/my`, {
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
                <OrganismsNavbar current="profile"/>
                <AtomsBreakLine length={3}/>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="container-fluid custom-container">
                            <AtomsBreakLine length={1}/>
                            <h2 className="mb-0">Here you can see and modify your account, sync to Telegram account, and sign out from your account</h2>
                            <hr></hr>
                            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">Profile</span> Page</h1>
                            <AtomsBreakLine length={1}/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex flex-column justify-content-center">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
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
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={1}/>
                        <div className="form-container">
                            <ProfileSectionEditForm item={items}/>
                        </div>
                        <AtomsBreakLine length={2}/>
                        <div className="form-container">
                            <ProfileSectionExportData/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={1}/>
                        <div className="form-container">
                            <ProfileSectionAllHistory ctx="all_history"/>
                        </div>
                        <AtomsBreakLine length={2}/>
                        <div className="form-container">
                            <ProfileSectionSendQuestion/>
                        </div>
                    </div>
                </div>
                
                <MoleculesFooter/>
            </main>
        );
    }
}