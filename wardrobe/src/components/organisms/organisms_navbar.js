"use client"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getCookie } from "../../modules/storages/cookie";
import AtomsNavItem from "../atoms/atoms_nav_item";

export default function OrganismsNavbar() {
    const [tokenKey, setTokenKey] = useState(null)
    const [usernameKey, setUsernameKey] = useState(null)

    useEffect(() => {
        setTokenKey(getCookie('token_key'))
        setUsernameKey(getCookie('username_key'))
    }, [])
    
    return  (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">Wardrobe</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <AtomsNavItem title="Home" url=""/>                        
                        {
                            tokenKey ? (
                                <>
                                    <AtomsNavItem title="Clothes" url="clothes"/>
                                    <AtomsNavItem title="Calendar" url="calendar"/>
                                    <AtomsNavItem title="Stats" url="stats"/>
                                    <AtomsNavItem title="Feedback" url="feedback"/>
                                </>
                            ) : (
                                <>
                                    <AtomsNavItem title={
                                        <div className="text-center" style={{fontSize:"var(--textXLG)"}}>DEMO <br></br><span className="bg-success text-white rounded-pill px-3 py-1" style={{fontSize:"var(--textMD)"}}>Try Now!</span></div>
                                    } url="demo"/>
                                    <AtomsNavItem title="Register" url="register"/>
                                </>
                            )
                        }
                        <AtomsNavItem title="About Us" url="about"/>
                    </ul>
                    <form className="d-flex">
                        <a className="btn btn-outline-success" href={tokenKey ? '/profile' : '/'}>{tokenKey ? <><FontAwesomeIcon icon={faUser}/> {usernameKey}</> : <>Sign In</>}</a>
                    </form>
                </div>
            </div>
        </nav>
    )
}