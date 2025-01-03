import AtomsNavItem from "../atoms/atoms_nav_item";

export default function OrganismsNavbar() {
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
                        <AtomsNavItem title="Clothes" url="clothes"/>
                        <AtomsNavItem title="Calendar" url="calendar"/>
                        <AtomsNavItem title="Stats" url="stats"/>
                        <AtomsNavItem title="Help Center" url="help"/>
                        <AtomsNavItem title="About Us" url="about"/>
                        <AtomsNavItem title="Feedback" url="feedback"/>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-success" type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}