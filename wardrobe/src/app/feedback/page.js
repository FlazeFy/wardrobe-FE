import styles from "../page.module.css";
import OrganismsNavbar from "../../components/organisms/organisms_navbar";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";
import MoleculesFooter from "../../components/molecules/molecules_footer";
import FeedbackSectionSend from "./sections/feedback_send";

export default function FeedbackPage() {
    return (
        <main className={styles.main}>
            <OrganismsNavbar current="feedback"/>
            <AtomsBreakLine length={1}/>
            <div style={{width:"760px"}} className="text-center mx-auto">
                <FeedbackSectionSend/>
                <AtomsBreakLine length={3}/>
            </div>
            <MoleculesFooter/>
        </main>
      );
}