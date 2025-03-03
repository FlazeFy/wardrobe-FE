"use client"
import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import RegisterSectionForm from "./sections/register_form";
import RegisterSectionTNC from "./sections/register_tnc";
import RegisterSectionValidate from "./sections/register_validate";

export default function RegisterPage(props) {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="register"/>
            <AtomsBreakLine length={3}/>
            <div style={{width:"760px"}} className="mx-auto">
                <AtomsBreakLine length={3}/>
                <RegisterSectionTNC/>
                <AtomsBreakLine length={4}/>
                <RegisterSectionForm/>
                <AtomsBreakLine length={4}/>
                <RegisterSectionValidate/>
                <AtomsBreakLine length={3}/>
            </div>
            
            <MoleculesFooter/>
        </main>
    );
}