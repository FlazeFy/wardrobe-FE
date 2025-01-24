
export default function AtomsNavItem({title, url, active}) {
    return  (
        <li className="nav-item">
            <a className={`nav-link ${active == url && 'active'}`} aria-current="page" href={`/${url}`}>{title}</a>
        </li>
    )
}