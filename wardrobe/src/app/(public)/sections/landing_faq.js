import { getLocal, storeLocal } from "../../../modules/storages/local"
import { faArrowRight, faCircleQuestion, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AtomsBreakLine from "../../../components/atoms/atoms_breakline"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import MoleculesFAQBox from "../../../components/molecules/molecules_faq_box"
import MoleculesAlertBox from "../../../components/molecules/molecules_alert_box"
import { fetchFAQ } from "@/modules/repositories/question_repository"
import Link from "next/link"

export default function LandingSectionFAQ(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [tokenKey, setTokenKey] = useState(null)
    const now = new Date()

    const fetchFAQHandler = () => {
        const oldTimeHit = getLocal('last_hit-faq')

        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data)
        }

        if (oldTimeHit) {
            const oldTime = new Date(JSON.parse(oldTimeHit))
            const timeDiffInSec = Math.floor((now - oldTime) / 1000)

            if (timeDiffInSec < 360) {
                const oldData = JSON.parse(getLocal('faq'))
                fetchData(oldData)
                return
            }
        }

        // Fetch repo
        fetchFAQ(
            (data) => {
                fetchData(data)
                storeLocal('faq', JSON.stringify(data))
                storeLocal('last_hit-faq', JSON.stringify(now))
            },
            (error) => {
                setError(error)
            }
        )
    }

    useEffect(() => {
        Swal.showLoading()
        setTokenKey(getLocal('token_key'))
        fetchFAQHandler()
    }, [])

    if (error) {
        return <MoleculesAlertBox message={error.message} type='danger' context={props.ctx}/>
    } else if (!isLoaded) {
        return <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
    } else {
        return (
            <div className="container custom-container mx-auto text-center">
                <AtomsBreakLine length={1}/>
                <h4 className="mb-0">Ask Anything About Our Apps?</h4>
                <hr></hr>   
                <h2 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">FAQ</span>&apos;s</h2>
                <h6 className="mb-3">Here&apos;s The Latest Question The People Given To Us</h6>
                <div className="mb-2">
                    <Link href="/feedback">
                        <button className="btn btn-primary fw-bold me-2"><FontAwesomeIcon icon={faArrowRight}/> See More!</button>
                    </Link>
                    <Link href={!tokenKey ? '/feedback':'/profile'}>
                        <button className="btn btn-primary fw-bold"><FontAwesomeIcon icon={faCircleQuestion}/> I Want To Ask</button>
                    </Link>
                </div>
                <div className="row mt-4">
                    {
                        items.map((dt, idx)=>{
                            return (
                                <div className="col-lg-6 col-md-6 col-sm-6 col-12 mx-auto" key={idx}>
                                    <MoleculesFAQBox id={idx} question={dt.question} answer={dt.answer} created_at={dt.created_at}/>
                                </div>
                            )
                        })
                    }
                </div>
                <AtomsBreakLine length={2}/>
            </div>
        )
    }
}
