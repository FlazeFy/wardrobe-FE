"use client"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getLocal } from "../../modules/storages/local";
import AtomsNavItem from "../atoms/atoms_nav_item";

export default function OrganismsNavbar(props) {
    const [tokenKey, setTokenKey] = useState(null)
    const [usernameKey, setUsernameKey] = useState(null)

    useEffect(() => {
        setTokenKey(getLocal('token_key'))
        setUsernameKey(getLocal('username_key'))
    }, [])
    
    return  (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <h2 className="text-main me-3" style={{fontWeight:800}} href="/">Wardrobe</h2>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <AtomsNavItem title="Home" url="" active={props.current}/>                        
                        {
                            tokenKey ? (
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
                        <a className="btn btn-primary" href={tokenKey ? '/profile' : '/'}>{tokenKey ? <><FontAwesomeIcon icon={faUser}/> {usernameKey}</> : <>Sign In</>}</a>
                    </form>
                </div>
            </div>
        </nav>
    )
}