import { faDownload, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingSectionPlatform() {
        return (
            <div className="mx-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 start">
                        <AtomsBreakLine length={8}/>
                        <h2 className="mb-0">Wardrobe Can Be Used From Web Apps, Mobile Apps, and Telegram BOT</h2>
                        <hr></hr>
                        <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>We're <span className="text-main">MultiPlatform</span></h1>
                        <h2 className="mb-2">Don't Worry, Almost All Of Our Feature Can Be Used Across All Platform</h2>
                        <a className="btn btn-success me-2 fw-bold" href=""><FontAwesomeIcon icon={faDownload}/> Get Mobile Version Now!</a>
                        <a className="btn btn-primary fw-bold" href=""><FontAwesomeIcon icon={faPaperPlane}/> Chat Our Telegram Bot</a>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <AtomsBreakLine length={4}/>
                        <img src={"/images/platform.jpg"} className="img img-fluid img-rounded me-3"/>
                        <AtomsBreakLine length={4}/>
                    </div>
                </div>
            </div>
        );
}
