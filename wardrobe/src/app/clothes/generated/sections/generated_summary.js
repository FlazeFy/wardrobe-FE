"use client"
import MoleculesAlertBox from "../../../../components/molecules/molecules_alert_box"
import { getLocal, storeLocal } from "../../../../modules/storages/local"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { getCookie } from "@/modules/storages/cookie"

export default function GeneratedSectionSummary(){
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItem] = useState(null)
    const tokenKey = getCookie("token_key")
    const now = new Date()

    const fetchfetchWashSummary = () => {
        const oldTimeHit = getLocal('last_hit-generated_outfit_summary')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)

        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItem(data)
        }

        if (timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('generated_outfit_summary'))
            fetchData(oldData)
        } else {
            Swal.showLoading()
            fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/summary`, {
                headers: {
                    'Authorization': `Bearer ${tokenKey}`, 
                },
            })
            .then(res => {
                if (res.status === 404) {
                    setIsLoaded(true)
                    setItem(null)
                    return null
                }
                Swal.close()
                return res.json()
            })
            .then(result => {
                if (result) {
                    Swal.close()
                    fetchData(result.data)
                    storeLocal('generated_outfit_summary', JSON.stringify(result.data))
                    storeLocal('last_hit-generated_outfit_summary', JSON.stringify(now))
                }
            })
            .catch(error => {
                Swal.close()
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    confirmButtonText: "Okay!"
                })
                setError(error)
            })
        }
    }
    
    useEffect(() => {
        fetchfetchWashSummary()
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
            <>
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <h2 className="mb-0">Total Outfit</h2>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.total_outfit}</>:<>0</>}</h4>
                </div>
                <div className="me-4 pe-3" style={{borderRight:"2px solid var(--shadowColor)"}}>
                    <h2 className="mb-0">Last Used</h2>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.last_used}</>:<>-</>}</h4>
                </div>
                <div>
                    <h4 className="mb-2"><span className="bg-success text-white py-1 px-3 rounded-pill">Next Suggestion</span></h4>
                    <h4 className="mb-0 text-secondary">{item ? <>{item.next_suggestion}</>:<span className="fst-italic" style={{fontSize:"var(--textLG)"}}>- No Enough Data To Analyze -</span>}</h4>
                </div>
            </>
        )
    }
}