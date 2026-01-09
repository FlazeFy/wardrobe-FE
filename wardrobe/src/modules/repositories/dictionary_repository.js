import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

export async function fetchDictionary(onSuccess, onError, tokenKey, dctType) {
    try {
        fetch(`http://127.0.0.1:8000/api/v1/dct/${dctType}`, {
            headers: {
                'Authorization': `Bearer ${tokenKey}`,
            },
        })
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