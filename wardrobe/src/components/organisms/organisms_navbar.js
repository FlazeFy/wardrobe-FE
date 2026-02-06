"use client"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AtomsNavItem from "../atoms/atoms_nav_item"
import Link from "next/link"
import useAuthStore from "@/modules/store/auth_store"

export default function OrganismsNavbar(props) {
    const { username } = useAuthStore()
    const isSignedIn = !!username
    
    return  (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <Link href="/">
                    <h2 className="text-main me-3" style={{fontWeight:800}}>Wardrobe</h2>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <AtomsNavItem title="Home" url="" active={props.current}/>                        
                        {
                            isSignedIn ? (
                                <>
                                    <AtomsNavItem title="Clothes" url="clothes" active={props.current}/>
                                    <AtomsNavItem title="Calendar" url="calendar" active={props.current}/>
                                    <AtomsNavItem title="Stats" url="stats" active={props.current}/>
                                    <AtomsNavItem title="Feedback" url="feedback" active={props.current}/>
                                </>
                            ) : (
                                <>
                                    <AtomsNavItem title={
                                        <div className="text-center" style={{fontSize:"var(--textXLG)"}}>DEMO <br></br><span className="bg-success text-white rounded-pill px-3 py-1" style={{fontSize:"var(--textMD)"}}>Try Now!</span></div>
                                    } url="demo"/>
                                    <AtomsNavItem title="Register" url="register" active={props.current}/>
                                </>
                            )
                        }
                        <AtomsNavItem title="About Us" url="about" active={props.current}/>
                    </ul>
                    <form className="d-flex">
                        <Link href={isSignedIn ? '/profile' : '/'}>
                            <button className="btn btn-primary">{isSignedIn ? <><FontAwesomeIcon icon={faUser}/> {username}</> : <>Sign In</>}</button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}