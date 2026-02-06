import Axios from 'axios'
import Swal from 'sweetalert2'
import { messageError } from "../helpers/message"
import { storeLocal } from "../storages/local"
import useAuthStore from '../store/auth_store'

export const postLogin = async (username, password,router) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "username" : username,
            "password" : password,
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/login", body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })
        Swal.close()

        // Response
        if(response.status === 200){
            // Store local storage
            storeLocal('token_key',response.data.token)
            // Store global state
            const { onLoginStore } = useAuthStore.getState() 
            onLoginStore(response.data)

            Swal.fire({
                title: "Success!",
                text: `Welcome, ${response.data.message.username}`,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                   router.push('/clothes')
                }
            })
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
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/register", body, {
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
                    // Store global state
                    const { onLoginStore } = useAuthStore.getState() 
                    onLoginStore({
                        username: response.data.result.username,
                        email: response.data.result.email,
                        role: response.data.result.role
                    })
                }
            })
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
        const { username } = useAuthStore()
        const body = {
            "token" : token,
            "username" : username
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/register/validate", body, {
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
            })
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
                    // Clear local storage
                    localStorage.clear()
                    // Clear global state
                    const { onLogOutStore } = useAuthStore.getState() 
                    onLogOutStore()

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