"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getLocal } from "@/modules/storages/local"
import useAuthStore from "@/modules/store/auth_store"

export default function ProtectedLayout({ children }) {
    const router = useRouter()
    const { username, hydrateAuth, isHydrated } = useAuthStore()

    useEffect(() => {
        const token = getLocal("token_key")

        if (!token) {
            router.replace("/")
            return
        }

        hydrateAuth()
    }, [])

    if (!isHydrated) return null 

    return children
}
