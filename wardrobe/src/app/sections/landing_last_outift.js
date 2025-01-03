import { faArrowRight, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingSectionLastOutfit() {
    return (
        <div className="mx-4">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={4}/>
                    <div className="d-inline-block">
                        <img src={"/images/hat_sample.jpg"} style={{maxWidth:"20%", minWidth:"100px"}} className="img img-fluid img-rounded me-3"/>
                        <img src={"/images/shirt_sample.jpg"} style={{maxWidth:"25%", minWidth:"100px"}} className="img img-fluid img-rounded me-3"/>
                        <img src={"/images/pants_sample.jpg"} style={{maxWidth:"22%", minWidth:"100px"}} className="img img-fluid img-rounded me-3"/>
                        <img src={"/images/shoes_sample.jpg"} style={{maxWidth:"18%", minWidth:"100px"}} className="img img-fluid img-rounded"/>
                    </div>
                    <h5 className="text-secondary mb-0">Set at 2024-12-10 10:20</h5>
                    <h2 className="mb-0">Last Outfit</h2>
                    <hr></hr>
                    <h2 className="mb-0">See more outfit history? <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faArrowRight}/> History</a></h2>
                    <AtomsBreakLine length={4}/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <AtomsBreakLine length={4}/>
                    <div className="container-generator">
                        <div className="position-absolute text-end" style={{top:"var(--spaceXLG)",right:"var(--spaceXLG)"}}>
                            <h5>32°C | Rainy | 75% Humidity</h5>
                            <h4>Today is Wednesday</h4>
                        </div>
                        <h3 className="mb-2">Do you want to hangout?</h3>
                        <p>We can generate your today's outfit based on outfit in wardrobe, cleaning status, routine, schedule, time, and today's weather. You can also set exception for some clothes, or just randomize between few clothes based on your need.</p>
                        <a className="btn btn-success fw-bold"><FontAwesomeIcon icon={faDice}/> Set My Outfit Now!</a>
                    </div>
                    <AtomsBreakLine length={4}/>
                </div>
            </div>
        </div>
    );
}
