import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

const MODULE_URL = "/api/v1/dct"

export async function fetchDictionary(onSuccess, onError, dctType) {
    try {
        fetch(`${MODULE_URL}/${dctType}`)
        .then(res => res.json())
            .then(
            (result) => {
                Swal.close()
                onSuccess(result.data)
            },
            (error) => {
                messageError(error)
            }
        )
    } catch (error) {
        messageError(error)
        onError(error)
    }
}