import * as Yup from "yup"

export const loginSchema = Yup.object({
    username: Yup.string().required("Username is required").min(6),
    password: Yup.string().required("Password is required").min(6),
})