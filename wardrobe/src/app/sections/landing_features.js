import MoleculesFeaturesBox from "../../components/molecules/molecules_features_box";
import { faArrowRight, faCalendar, faCircleQuestion,faDice,faPersonDress,faPieChart,faShirt, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AtomsBreakLine from "../../components/atoms/atoms_breakline";

export default function LandingSectionFeatures() {
    return (
        <div className="mx-4">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <MoleculesFeaturesBox 
                        title="Store Clothes Information" 
                        description="Keep track of your wardrobe by listing each item with its name, type, category, size, price, brand, and color. Add tags to make outfit selection easier and smarter!" 
                        icon={<FontAwesomeIcon icon={faShirt}/>}
                    />
                    <MoleculesFeaturesBox 
                        title="Customize Your Outfit" 
                        description="Organize your clothes by type like hats, shirts, pants, and shoes. Mix and match by color, style, or any way you like to create the perfect outfit!" 
                        icon={<FontAwesomeIcon icon={faPersonDress} size="xl"/>}
                    />
                    <MoleculesFeaturesBox 
                        title="Outfit Generator!" 
                        description="Let our smart algorithm suggest the best outfit for you! Based on your stored clothes, wash schedule, and usage history, we’ll help you dress effortlessly." 
                        icon={<FontAwesomeIcon icon={faDice}/>}
                    />
                    <MoleculesFeaturesBox 
                        title="Wash & Wear Scheduling" 
                        description="Plan your laundry days, track when you last wore each item, and ensure all your clothes get equal love. Use our calendar to stay organized!" 
                        icon={<FontAwesomeIcon icon={faCalendar}/>}
                    />
                    <MoleculesFeaturesBox 
                        title="Analyze Your Wardrobe" 
                        description="Curious about your most-worn outfits? Want to rediscover forgotten pieces? Our analytics visualize your wardrobe habits in insightful ways." 
                        icon={<FontAwesomeIcon icon={faPieChart}/>}
                    />
                    <MoleculesFeaturesBox 
                        title="Export & Manage Your Data" 
                        description="View and export your clothing data in different formats like Excel or PDF. Prefer manual management? Easily edit your wardrobe outside the app!" 
                        icon={<FontAwesomeIcon icon={faTable}/>}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 start">
                    <AtomsBreakLine length={8}/>
                    <h2 className="mb-0">From Store Your Clothes Information Until Deciding What You Should Wear Tommorow!</h2>
                    <hr></hr>   
                    <h1 className="mb-0" style={{fontSize:"74px", fontWeight:"800"}}>Our <span className="text-main">Capabilities</span></h1>
                    <h2 className="mb-2">Want to Know How Our Apps Works?</h2>
                    <a className="btn btn-success fw-bold me-2" href="/feedback"><FontAwesomeIcon icon={faArrowRight}/> See More!</a>
                    <a className="btn btn-primary fw-bold" href="/feedback"><FontAwesomeIcon icon={faCircleQuestion}/> Get The Manual</a>
                </div>
            </div>
        </div>
    );
}
