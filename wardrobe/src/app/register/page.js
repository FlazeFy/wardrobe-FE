"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import RegisterSectionForm from "./sections/register_form";
import RegisterSectionTNC from "./sections/register_tnc";
import RegisterSectionValidate from "./sections/register_validate";
import { useState } from "react";

export default function RegisterPage(props) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [isRegistered, setIsRegistered] = useState(false)
    const [showFormRegister, setShowFormRegister] = useState(false)
    const [showFormToken, setShowFormToken] = useState(false)
    const [startValidationTimer, setStartValidationTimer] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    return (
        <main className={styles.main}>
            <OrganismsNavbar current="register"/>
            <AtomsBreakLine length={3}/>
            <div style={{width:"760px"}} className="mx-auto">
                <AtomsBreakLine length={3}/>
                <RegisterSectionTNC 
                    setIsDisabled={setIsDisabled} setShowFormRegister={setShowFormRegister}
                    isRegistered={isRegistered}
                    username={username} password={password} email={email}
                    setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}
                />
                <AtomsBreakLine length={4}/>
                <div className={!showFormRegister ? "d-none":""}>
                    <RegisterSectionForm 
                        isDisabled={isDisabled} isRegistered={isRegistered} setIsRegistered={setIsRegistered}
                        setIsDisabled={setIsDisabled} setShowFormToken={setShowFormToken}
                        username={username} password={password} email={email}
                        setUsername={setUsername} setPassword={setPassword} setEmail={setEmail}
                        setStartValidationTimer={setStartValidationTimer}
                    />
                    <AtomsBreakLine length={3}/>
                </div>
                <div className={!showFormToken ? "d-none":""}>
                    <AtomsBreakLine length={4}/>
                    <RegisterSectionValidate
                        startValidationTimer={startValidationTimer}
                    />
                    <AtomsBreakLine length={3}/>
                </div>
            </div>
            
            <MoleculesFooter/>
        </main>
    );
}