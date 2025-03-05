"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import FeedbackSectionSend from "./sections/feedback_send";
import ProfileSectionSendQuestion from "../profile/sections/profile_post_question";
import { useEffect, useState } from "react";
import { getCookie } from "../../modules/storages/cookie";

export default function FeedbackPage() {
    const [tokenKey, setTokenKey] = useState(null)

    useEffect(() => {
        setTokenKey(getCookie('token_key'))
    }, [])

    return (
        <main className={styles.main}>
            <OrganismsNavbar current="feedback"/>
            <AtomsBreakLine length={2}/>
            <div style={{width:"760px"}} className="container custom-container text-center mx-auto">
                <FeedbackSectionSend/>
                <AtomsBreakLine length={!tokenKey ? 5 : 0}/>
                {
                    !tokenKey && <ProfileSectionSendQuestion/>
                }
            </div>
            <MoleculesFooter/>
        </main>
      );
}