import Link from "next/link"

export default function AtomsNavItem({title, url, active}) {
    return  (
        <li className="nav-item">
            <Link href={`/${url}`}>
                <button className={`nav-link ${active == url && 'active'}`} aria-current="page" href={`/${url}`}>{title}</button>
            </Link>
        </li>
    )
}