
export default function AtomsNavItem({title, url}) {
    return  (
        <li className="nav-item">
            <a className="nav-link" aria-current="page" href={`/${url}`}>{title}</a>
        </li>
    )
}