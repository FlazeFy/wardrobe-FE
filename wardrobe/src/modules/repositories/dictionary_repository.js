import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

const MODULE_URL = "/api/v1/dct"

export const fetchDictionary = async (onSuccess, onError, dctType) => {
    try {
        const response = await apiCall.get(`${MODULE_URL}/${dctType}`)
        onSuccess(response.data.data)
    } catch (error) {
        messageError(error)
        onError(error)
    }    
}