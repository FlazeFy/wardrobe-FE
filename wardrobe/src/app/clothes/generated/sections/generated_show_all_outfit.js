"use client"
import AtomsBreakLine from "../../../..//components/atoms/atoms_breakline";
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2";
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box";
import OrganismsOutfit from "../../../../components/organisms/organisms_outfit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function GeneratedSectionShowAllOutfit(props) {
    // Initial variables
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchAllOutfit(1)
    }, [])

    const fetchAllOutfit = (currentPage) => {
        Swal.showLoading();
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit?page=${currentPage}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 288|63yTrvRp2Mb5V28ibnREpmTlQHgxKZCQlADQrBIg57da1e50`, 
            },
        })
        .then((res) => res.json())
        .then(
            (result) => {
                Swal.close()
                setIsLoaded(true)

                setItems((prevItems) => [...prevItems, ...result.data.data])
                setMaxPage(result.data.last_page)
            },
            (error) => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
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
                <div className="row">
                    {
                        items.length > 0 ? (
                            items.map((dt, index) => (
                                <div key={index} className="col-lg-6 col-md-6 col-sm-12 col-12 mx-auto">
                                    <OrganismsOutfit items={dt} />
                                </div>
                            ))
                        ) : (
                            <div className="my-2">
                                <p className="text-secondary">- No Outfit Found -</p>
                            </div>
                        )
                    }
                </div>
                { page < maxPage && <a className="btn btn-link mt-3" onClick={seeMore}><FontAwesomeIcon icon={faMagnifyingGlass}/> Show More</a> }
            </div>
        )
    }
}
