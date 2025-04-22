"use client"
import AtomsBreakLine from "../../../..//components/atoms/atoms_breakline";
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box";
import OrganismsOutfit from "../../../../components/organisms/organisms_outfit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../../../modules/storages/cookie";
import MoleculesNoData from "../../../../components/molecules/molecules_no_data";

export default function GeneratedSectionShowAllOutfit(props) {
    // Initial variables
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(1)
    const tokenKey = getCookie("token_key")

    useEffect(() => {
        fetchAllOutfit(1)
    }, [])

    const fetchAllOutfit = (currentPage) => {
        Swal.showLoading();
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit?page=${currentPage}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenKey}`, 
            },
        })
        .then((res) => res.json())
        .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)

                result.data ? setItems((prevItems) => [...prevItems, ...result.data.data]) : setItems(null)
                setMaxPage(result.data ? result.data.last_page : 1)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                });
                setError(error)
            }
        )
    }

    const seeMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        fetchAllOutfit(nextPage)
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type="danger" context={props.ctx} />
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className="text-center text-white mt-2 fst-italic">Loading...</h5>
            </div>
        )
    } else {
        return (
            <div className="mx-4 text-center mx-auto" style={{ maxWidth: "1280px" }}>
                <h1 className="mb-3" style={{ fontSize: "74px", fontWeight: "800" }}>My Outfit</h1>
                <h5 className="mb-4 text-secondary">
                    Here's your outfit that are generated automatically or manually. Each of these outfits contains some clothes that you can wear.
                </h5>
                <AtomsBreakLine length={1} />
                <div className="row" id="outfit-holder">
                    {
                        items && items.length > 0 ? (
                            items.map((dt, index) => (
                                <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
                                    <OrganismsOutfit items={dt} />
                                </div>
                            ))
                        ) : <MoleculesNoData title="No Outfit Found"/>
                    }
                </div>
                { page < maxPage && <a className="btn btn-link mt-3" onClick={seeMore}><FontAwesomeIcon icon={faMagnifyingGlass}/> Show More</a> }
            </div>
        )
    }
}
