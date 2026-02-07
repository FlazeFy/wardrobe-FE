"use client"
import MoleculesAlertBox from "../../../../../components/molecules/molecules_alert_box"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { getLocal } from "../../../../../modules/storages/local"
import { convertDatetimeBasedLocal } from "../../../../../modules/helpers/converter"
import { fetchOutfitSummary } from "@/modules/repositories/outfit_repository"

export default function GeneratedSectionSummary(props){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)
    const tokenKey = getLocal("token_key")
    const now = new Date()
    
    useEffect(() => {
        Swal.showLoading()
        fetchOutfitSummary(now, 
            (result) =>{
                setIsLoaded(true)
                setItem(result)
            }, 
            (error) => {
                setIsLoaded(true)
                setError(error)
            }, tokenKey)
    },[])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <>
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <h2 className="mb-0">Total Outfit</h2>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.total_outfit}</>:<>0</>}</h4>
                </div>
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <h2 className="mb-0">Last Used</h2>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.last_used.outfit_name} <span className="fst-italic" style={{fontSize:"var(--textXMD)"}}>at {convertDatetimeBasedLocal(item.last_used.used_at)}</span></>:<>-</>}</h4>
                </div>
                <div>
                    <h4 className="mb-2"><span className="bg-success text-white py-1 px-3 rounded-pill">Next Suggestion</span></h4>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.next_suggestion}</>:<span className="fst-italic" style={{fontSize:"var(--textLG)"}}>- No Enough Data To Analyze -</span>}</h4>
                </div>
            </>
        )
    }
}