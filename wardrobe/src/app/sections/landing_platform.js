import { faDownload, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LandingSectionPlatform() {
    return (
        <div className="row">
            <div className="col-lg-6 col-md-12 text-center text-lg-end pb-5 pb-lg-0 order-2 order-lg-1">
                <h4 className="mb-0">Wardrobe Can Be Used From Web Apps, Mobile Apps, and Telegram BOT</h4>
                <hr></hr>
                <h2 className="mb-0 text-title" style={{fontWeight:"800"}}>We&apos;re <span className="text-main">MultiPlatform</span></h2>
                <h4 className="mb-2">Don&apos;t Worry, Almost All Of Our Feature Can Be Used Across All Platform</h4>
                <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                    <a className="btn btn-success fw-bold" href="">
                        <FontAwesomeIcon icon={faDownload}/><span className="d-none d-xl-inline"> Get</span> Mobile Version<span className="d-none d-xl-inline"> Now!</span>
                    </a>
                    <a className="btn btn-primary fw-bold" href="">
                        <FontAwesomeIcon icon={faPaperPlane}/><span className="d-none d-xl-inline"> Chat Our</span> Telegram Bot
                    </a>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 order-1 order-lg-2 d-flex align-items-center">
                <img src={"/images/platform.jpg"} className="img img-fluid img-rounded mb-5 mb-lg-0"/>
            </div>
        </div>
    )
}
