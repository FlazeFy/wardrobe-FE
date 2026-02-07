"use client"
import AtomsBreakLine from "../../../../../components/atoms/atoms_breakline"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import MoleculesAlertBox from "../../../../../components/molecules/molecules_alert_box"
import OrganismsOutfit from "../../../../../components/organisms/organisms_outfit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from "../../../../../modules/storages/local"
import MoleculesNoData from "../../../../../components/molecules/molecules_no_data"
import { fetchAllOutfit } from "@/modules/repositories/outfit_repository"

export default function GeneratedSectionShowAllOutfit(props) {
    // Initial variables
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [page, setPage] = useState(1)
    const tokenKey = getLocal("token_key")

    useEffect(() => {
        getAllOutfit(1)
    }, [])

    const getAllOutfit = (page) => {
        Swal.showLoading()
        fetchAllOutfit(page,
        (result) => {
            setIsLoaded(true)

            result ? setItems((prevItems) => [...prevItems, ...result.data]) : setItems(null)
            setMaxPage(result ? result.last_page : 1)
        },
        (error) => {
            setIsLoaded(true)
            setError(error)
        },
        tokenKey)
    }

    const seeMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        getAllOutfit(1)    
    }

    if (error) {
        return <MoleculesAlertBox message={error.message} type="danger" context={props.ctx} />
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="mx-4 text-center mx-auto" style={{ maxWidth: "1280px" }}>
                <h1 className="mb-3" style={{ fontSize: "74px", fontWeight: "800" }}>My Outfit</h1>
                <h5 className="mb-4 text-secondary">
                    Here&apos;s your outfit that are generated automatically or manually. Each of these outfits contains some clothes that you can wear.
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
