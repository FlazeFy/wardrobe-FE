import AtomsBreakLine from "@/components/atoms/atoms_breakline";
import OrganismsNavbar from "../components/organisms/organisms_navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <OrganismsNavbar/>

      <div className="mx-4" style={{marginTop:"14vh"}}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <AtomsBreakLine length={4}/>
            <h2 className="mb-0">Wardrobe is your ultimate clothing assistant, helping you organize outfits, track history, manage schedules, and plan weekly looks</h2>
            <hr></hr>
            <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Effortless style decision and Organize</h1>
            <h2 className="mb-0">Join us Now. Its <span className="text-success fw-bold">Free!</span></h2>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end">
            <div className="d-flex justify-content-end align-items-center">
              <div className="p-2">
                <img src={"/images/people.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                <h3 className="fw-bold mb-0">40 +</h3>
                <h5 className="text-secondary">Active User</h5>
              </div>
              <div className="p-2 me-3" style={{maxWidth:"200px"}}>
                <div className="text-start">
                  <h3 className="fw-bold mb-0">40 +</h3>
                  <h5 className="text-secondary">Outfit Decision</h5>
                  <img src={"/images/outfit.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                </div>
                <div className="text-end">
                  <img src={"/images/reminder.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                  <h3 className="fw-bold mb-0">40 +</h3>
                  <h5 className="text-secondary">Average Weekly Reminder</h5>
                </div>
              </div>
              <div className="p-2 text-start">
                <img src={"/images/clothes.jpg"} style={{maxWidth:"50%", minWidth:"200px"}} className="img img-fluid mb-2 img-rounded"/>
                <h3 className="fw-bold mb-0">40 +</h3>
                <h5 className="text-secondary">Clothes</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
