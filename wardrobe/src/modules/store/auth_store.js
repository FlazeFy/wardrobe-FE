import { create } from "zustand"

const useAuthStore = create((set) => ({
    username: "",
    email: "",
    role: "",

    onLoginStore: (payload) => {
        set(() => ({
            username: payload.message.username,
            email: payload.message.email,
            role: payload.role,
        }))
    },

    onLogOutStore: () => {
        set(() => ({
            username: "",
            email: "",
            role: "",
        }))
    },
}))

export default useAuthStore
