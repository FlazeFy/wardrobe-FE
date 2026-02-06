import { create } from "zustand"
import { fetchRefreshToken } from "../repositories/user_repository"
import { getLocal } from "../storages/local"

const useAuthStore = create((set, get) => ({
    username: "",
    email: "",
    role: "",
    isHydrated: false,

    onLoginStore: (payload) => {
        set(() => ({
            username: payload.message.username,
            email: payload.message.email,
            role: payload.role,
            isHydrated: true,
        }))
    },
    onLogOutStore: () => {
        set(() => ({
            username: "",
            email: "",
            role: "",
            isHydrated: true,
        }))
    },
    hydrateAuth: async () => {
        const state = get()
        const tokenKey = getLocal("token_key")

        if (state.isHydrated || state.username || !tokenKey) return
        try {
            const data = await fetchRefreshToken(tokenKey)

            if (!data) {
                set({ isHydrated: true })
                return
            }

            set({
                username: data.username ?? "",
                email: data.email ?? "",
                role: data.role ?? "",
                isHydrated: true,
            })
        } catch (error) {
            set({ isHydrated: true })
        }
    },
}))

export default useAuthStore
