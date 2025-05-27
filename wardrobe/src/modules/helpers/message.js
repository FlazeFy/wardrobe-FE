import Swal from "sweetalert2"
import { getErrorValidation } from "./converter"

export const messageError = (error) => {
    Swal.close()
    if (error.response && (error.response.status === 422 || error.response.status === 409 || error.response.status === 401)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: getErrorValidation(error.response.data.message),
            confirmButtonText: "Okay!"
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            confirmButtonText: "Okay!"
        })
    }
}