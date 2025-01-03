import { faArrowRight, faDice, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingFeedback() {
    return (
        <div className="mx-4">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end">
                    <div className="d-flex justify-content-start align-items-center">
                    <div className="p-2">
                        <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                        <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> 4</h3>
                        <h5 className="text-secondary">Good job, <span className="text-secondary">by Leo</span></h5>
                    </div>
                    <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                        <div className="text-start">
                        <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> 5</h3>
                        <h5 className="text-secondary">Good job, <span className="text-secondary">by Leo</span></h5>
                        <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                        </div>
                        <div className="text-end">
                        <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                        <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> 5</h3>
                        <h5 className="text-secondary">Good job, <span className="text-secondary">by Leo</span></h5>
                        </div>
                    </div>
                    <div className="p-2 text-start">
                        <img src={"/images/person_profile_pic_sample.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                        <h3 className="fw-bold mb-0"><FontAwesomeIcon icon={faStar}/> 4</h3>
                        <h5 className="text-secondary">Good job, <span className="text-secondary">by Leo</span></h5>
                    </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end">
                    <AtomsBreakLine length={4}/>
                    <h2 className="mb-0">5 Average Rate<span className="text-secondary" style={{fontSize:"var(--textXLG)"}}>, from total <b>24</b> feedback</span></h2>
                    <hr></hr>
                    <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>What they say?</h1>
                    <h2 className="mb-0">Give your experience when using us too <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faArrowRight}/> Feedback</a></h2>
                </div>
            </div>
        </div>
    );
}
