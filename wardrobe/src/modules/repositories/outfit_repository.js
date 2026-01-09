import { getLocal, storeLocal } from "../storages/local"
import Axios from 'axios'
import Swal from "sweetalert2"
import { messageError } from "../helpers/message"

export const postSaveOutfit = async (token) => {
    try {
        Swal.showLoading()

        // Payload
        const data = JSON.parse(getLocal('generated_outfit_history'))
        const body = {
            'list_outfit' : data
        }

        // Exec
        let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/save`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        Swal.hideLoading()
        
        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('generated_outfit_history')
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export const postSaveOutfitHistory = async (id,tokenKey,props) => {
    try {
        // Payload
        const data = {
            outfit_id : id,
            used_context: 'Work'
        }

        // Exec
        let response = await Axios.post(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/save`, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
            }
        })
        
        // Response
        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    props.fetchOutfit()
                    props.fetchAllHistory()
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export async function fetchAllOutfit(page, onSuccess, onError, tokenKey) {
    try {
        fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenKey}`, 
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

export async function fetchOutfitMonthlyTotalUsedById(id, onSuccess, onError, tokenKey) {
    try {
        fetch(`http://127.0.0.1:8000/api/v1/stats/outfit/monthly/by_outfit/2025/${id}`, {
            headers: {
                'Content-Type': 'application/json',
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

export const deleteOutfitHistoryById = async (id,action,tokenKey) => {
    try {
        let response = await Axios.delete(`http://127.0.0.1:8000/api/v1/clothes/outfit/history/by/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
            }
        })
        
        if(response.status === 200){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    action()
                }
            })
        } else {
            messageError("Something went wrong!")
        }
    } catch (error) {
        messageError(error)
    }
}

export async function fetchOutfitSummary(now, onSuccess, onError, tokenKey) {
    try {
        const oldTimeHit = getLocal("last_hit-generated_outfit_summary")
        const oldTime = oldTimeHit ? new Date(JSON.parse(oldTimeHit)) : null
        const timeDiffInSec = oldTime ? Math.floor((now - oldTime) / 1000) : null

        const fetchData = (data) => {
            Swal.close()
            onSuccess(data)
        }

        if (timeDiffInSec !== null && timeDiffInSec < 540 && oldTimeHit) {
            const oldData = JSON.parse(getLocal("generated_outfit_summary"))
            fetchData(oldData)
            return
        }

        const response = await fetch(`http://127.0.0.1:8000/api/v1/clothes/outfit/summary`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`, 
            },
        })
        const result = await response.json()

        if (response.ok) {
            fetchData(result.data)
            storeLocal('generated_outfit_summary', JSON.stringify(result.data))
            storeLocal('last_hit-generated_outfit_summary', JSON.stringify(now))
        } else {
            throw new Error(result.message || "Failed to fetch data")
        }
    } catch (error) {
        messageError(error)
        onError(error)
    }
}