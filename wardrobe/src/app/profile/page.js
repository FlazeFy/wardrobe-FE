"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";
import ProfileSectionEditForm from "./sections/profile_edit_form";
import { convertDatetimeBasedLocal } from "../../modules/helpers/converter";

export default function ProfilePage() {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        fetchProfile()
    },[])

    const fetchProfile = () => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/user/my`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
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
                })
                setError(error)
            }
        )
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={ctx}/>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <main className={styles.main}>
                <OrganismsNavbar/>
                <AtomsBreakLine length={3}/>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <h2 className="mb-0">Here you can see and modify your account, sync to Telegram account, and sign out from your account</h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Profile Page</h1>
                        <AtomsBreakLine length={2}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <div className='d-block mx-auto' style={{width:"700px"}}> 
                            <div className='d-flex justify-content-end'>
                                <div className='me-2 text-end'>
                                    <h4 className="mb-0 text-secondary">{convertDatetimeBasedLocal(items.created_at)}</h4>
                                </div>
                                <div>
                                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Joined Since</h1>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <div className='me-2'>
                                    <h1 className="mb-0" style={{fontSize:"calc(var(--textXJumbo)*1.1)", fontWeight:"800"}}>Last Updated</h1>
                                </div>
                                <div className='text-start'>
                                    <h4 className="mb-0 text-secondary">{items.updated_at ?? '-'}</h4>
                                </div>
                            </div>
                        </div>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={1}/>
                        <ProfileSectionEditForm item={items}/>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>
                
                <MoleculesFooter/>
            </main>
        );
    }
}