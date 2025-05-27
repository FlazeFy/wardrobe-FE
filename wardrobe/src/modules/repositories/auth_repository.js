import { storeCookie } from "../storages/cookie"
import Axios from 'axios'
import Swal from 'sweetalert2'
import { messageError } from "../helpers/message"

export const postLogin = async (username, password,router) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "username" : username,
            "password" : password,
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/login", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        Swal.close()

        // Response
        if(response.status === 200){
            const username = response.data.result.username
            storeCookie('token_key',response.data.token)
            storeCookie('username_key',username)

            Swal.fire({
                title: "Success!",
                text: `Welcome, ${username}`,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                   router.push('/clothes')
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.result,
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}