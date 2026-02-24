import Swal from 'sweetalert2'
import { messageError } from "../helpers/message"
import { storeLocal } from "../storages/local"
import useAuthStore from '../store/auth_store'
import apiCall from '@/configs/axios'

const MODULE_URL = "/api/v1"

export const postLogin = async (username, password, router) => {
    try {
        // Payload
        const body = {
            "username" : username,
            "password" : password,
        }

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/login`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })

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
                if (result.isConfirmed) router.push('/clothes')
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const postRegister = async (props) => {
    try {
        // Payload
        const body = {
            "username" : props.username,
            "password" : props.password,
            "email" : props.email,
        }

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/register`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })

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
        }
    } catch (error) {
        messageError(error)
    }
}

export const postValidateRegister = async (token,router) => {
    try {
        // Payload
        const { username } = useAuthStore()
        const body = {
            "token" : token,
            "username" : username
        }

        // Exec
        const response = await apiCall.post(`${MODULE_URL}/register/validate`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            }
        })

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
        } 
    } catch (error) {
        messageError(error)
    }
}

export const postSignOut = async (router) => {
    try {
        let response = await apiCall.get(`${MODULE_URL}/logout`)
        
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
        } 
    } catch (error) {
        messageError(error)
    }
}