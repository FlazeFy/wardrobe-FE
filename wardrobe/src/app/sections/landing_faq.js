import { getLocal, storeLocal } from "../../modules/storages/local";
import { faArrowRight, faCircleQuestion, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import MoleculesFAQBox from "../../components/molecules/molecules_faq_box";
import { getCookie } from "../../modules/storages/cookie";
import MoleculesAlertBox from "../../components/molecules/molecules_alert_box";

export default function LandingSectionFAQ(props) {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)
    const [tokenKey, setTokenKey] = useState(null)
    const now = new Date()

    const fetchFAQ = () => {
        const oldTimeHit = getLocal('last_hit-faq')
        const oldTime = new Date(JSON.parse(oldTimeHit))
        const timeDiffInSec = Math.floor((now - oldTime) / 1000)
    
        const fetchData = (data) => {
            Swal.close()
            setIsLoaded(true)
            setItems(data)
        }
    
        if (timeDiffInSec < 360 && oldTimeHit) {
            const oldData = JSON.parse(getLocal('faq'))
            fetchData(oldData)
        } else {
            fetch(`http://127.0.0.1:8000/api/v1/question/faq`)
            .then(res => res.json())
                .then(
                (result) => {
                    Swal.close()
                    setIsLoaded(true)
                    fetchData(result.data)
                    storeLocal('faq', JSON.stringify(result.data))
                    storeLocal('last_hit-faq', JSON.stringify(now)) 
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
    }

    useEffect(() => {
        Swal.showLoading()
        setTokenKey(getCookie('token_key'))
        fetchFAQ()
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
            <div className="container custom-container mx-auto text-center" style={{minWidth:"1080px"}}>
                <AtomsBreakLine length={2}/>
                <h2 className="mb-0">Ask Anything About Our Apps?</h2>
                <hr></hr>   
                <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}><span className="text-main">FAQ</span>&apos;s</h1>
                <h2 className="mb-2">Here&apos;s The Latest Question The People Given To Us</h2>
                <a className="btn btn-primary fw-bold me-2" href="/feedback"><FontAwesomeIcon icon={faArrowRight}/> See More!</a>
                <a className="btn btn-primary fw-bold" href={!tokenKey ? '/feedback':'/profile'}><FontAwesomeIcon icon={faCircleQuestion}/> I Want To Ask</a>
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
        );
    }
}
