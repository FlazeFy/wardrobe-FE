import { storeCookie } from "../storages/cookie"
import Axios from 'axios'
import Swal from 'sweetalert2'
import { messageError } from "../helpers/message"
import { getLocal, storeLocal } from "../storages/local"

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

export const postRegister = async (props) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "username" : props.username,
            "password" : props.password,
            "email" : props.email,
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/register", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        Swal.close()

        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                    props.setIsDisabled(true)
                    props.setIsRegistered(true)
                    props.setShowFormToken(true)
                    props.setStartValidationTimer(true)
                    storeLocal("username_key",response.data.result.username)
                }
            });
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const postValidateRegister = async (token,router) => {
    try {
        Swal.showLoading()

        // Payload
        const username = getLocal("username_key")
        const body = {
            "token" : token,
            "username" : username
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/register/validate", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        Swal.close()

        // Response
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                    storeLocal("is_new_user",true)
                    router.push('/')
                }
            });
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const postSignOut = async (tokenKey,router) => {
    try {
        Swal.showLoading()
        let response = await Axios.get(`http://127.0.0.1:8000/api/v1/logout`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
            }
        })
        
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    localStorage.clear()
                    document.cookie = "cookieName=; path=/"
                    router.push('/')
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}