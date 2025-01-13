import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingSectionPlatform() {
        return (
            <div className="mx-4">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 start">
                        <AtomsBreakLine length={8}/>
                        <h2 className="mb-0">Wardrobe Can Be Used From Web Apps, Mobile Apps, and Telegram BOT</h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>We're MultiPlatform</h1>
                        <h2 className="mb-2">Give your experience when using us too</h2>
                        <a className="btn btn-success fw-bold" href="/feedback"><FontAwesomeIcon icon={faDownload}/> Get It Now!</a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <img src={"/images/platform.jpg"} className="img img-fluid img-rounded me-3"/>
                        <AtomsBreakLine length={4}/>
                    </div>
                </div>
            </div>
        );
}
