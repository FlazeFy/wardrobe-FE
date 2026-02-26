"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'
import { postLogin } from '@/modules/repositories/auth_repository'

export default function DetectFlazenAppsAlert() {
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const openedFrom = searchParams.get('opened_from')
        const isFromFlazen = sessionStorage.getItem('is_from_flazenapps')

        if (openedFrom === 'flazenapps') {
            sessionStorage.setItem('is_from_flazenapps', 'true')

            const url = window.location.origin + window.location.pathname
            router.replace(url)
        } else if (isFromFlazen === 'true') {
            setShowAlert(true)
        }
    }, [searchParams, router])

    const handleLoginTestAcc = () => {
        Swal.showLoading()
        postLogin('tester_flazenapps', 'tester123')
    }

    const handleRejectTestAcc = () => {
        sessionStorage.removeItem('is_from_flazenapps')
        router.push('/')
    }

    if (!showAlert) return null

    return (
        <div id="alert-flazenapps" style={{ position: 'fixed', bottom: 'var(--spaceLG)', left: 'var(--spaceLG)', zIndex: 999 }}>
            <div>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample1" aria-expanded="false" aria-controls="multiCollapseExample1"
                    style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>FlazenApps Was Here!</button>
                <div className="collapse multi-collapse mt-2" id="multiCollapseExample1">
                    <div className="content p-3" style={{ background: 'var(--flazenPrimaryColor)', borderRadius: 'var(--roundedLG)', width: 480 }}>
                        <h2 className="mb-2" style={{ fontSize: 'calc(var(--textJumbo)*1.25)', color: 'var(--flazenDarkColor)' }}>Hey FlazenApps Was Here!</h2>
                        <p className="text-dark mb-2">We know that you have opened <b>Wardrobe</b> from <b>FlazenApps</b> platform, are you want to use our testing account so you can explore this apps easily?</p>
                        <button className="btn btn-primary me-2" onClick={handleLoginTestAcc}>Yeah, Bring Me There!</button>
                        <button className="btn btn-danger" onClick={handleRejectTestAcc}>Maybe, Later</button>
                        <hr />
                        <p className="text-dark mb-2">Want to ask something? or you want to give us a feedback?</p>
                        <a className="btn btn-link me-2" href="https://t.me/flazenapps"><i className="fa-brands fa-telegram me-1"></i> t.me/flazenapps</a>
                        <a className="btn btn-link" href="mailto:flazen.edu@gmail.com?subject=Hello%20FlazenApps&body=I%20want%20to%20know%20more%20about%20Wardrobe">
                            <i className="fa-solid fa-envelope me-1"></i> flazen.edu@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
