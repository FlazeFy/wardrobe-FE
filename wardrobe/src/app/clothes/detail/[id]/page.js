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

export default function ClothesDetailPage(props) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        Swal.showLoading()
        fetch(`http://127.0.0.1:8000/api/v1/clothes/detail/10bacb64-e819-11ed-a05b-0242ac120003`, {
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
    },[])

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
                <AtomsBreakLine length={2}/>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <div className="d-flex justify-content-start">
                            <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                                <h2 className="mb-0">Category</h2>
                                <h4 className="mb-0 text-secondary">{getCleanTitleFromCtx(items.detail.clothes_category)}</h4>
                            </div>
                            <div>
                                <h2 className="mb-0">Type</h2>
                                <h4 className="mb-0 text-secondary">{items.detail.clothes_type}</h4>
                            </div>
                        </div>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>{items.detail.clothes_name}</h1>
                        <p className="text-secondary">{items.detail.clothes_desc}</p>
                        <AtomsBreakLine length={2}/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={2}/>
                        <img src={"/images/shoes_sample.jpg"} style={{maxWidth:"50%", minWidth:"100px"}} className="img img-fluid img-rounded d-block mx-auto"/>
                        <AtomsBreakLine length={2}/>
                    </div>
                </div>

                <AtomsBreakLine length={2}/>
                <div style={{maxWidth:"50vw"}}>
                    <h2 className="mb-0 fw-bold">Edit Clothes</h2>
                    <h5 className="text-secondary">This clothes has been added to your wardrobe since {items.detail.created_at}{items.detail.updated_at && <span>and the last update was detected on {items.detail.updated_at}</span>}</h5>
                </div>
                <AtomsBreakLine length={1}/>
                <ClothesDetailEditForm ctx="clothes_detail" item={items.detail}/>
                <AtomsBreakLine length={2}/>

                <MoleculesFooter/>
            </main>
        )
    }
}