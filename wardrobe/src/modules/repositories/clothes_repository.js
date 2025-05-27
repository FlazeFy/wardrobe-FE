import Swal from "sweetalert2";
import Axios from 'axios'
import { messageError } from "../helpers/message";

export const postClothes = async (clothesName,clothesDesc,clothesMerk,clothesSize,clothesGender,clothesMadeFrom,clothesCategory,
    clothesType,clothesPrice,clothesBuyAt,clothesQty,clothesImage,isFaded,hasWashed,hasIroned,isFavorite,isScheduled,tokenKey,router) => {
    try {
        Swal.showLoading()

        // Payload
        const formData = new FormData()
        if(clothesBuyAt){
            const todayDate = new Date()
            const clothesBuyAtDate = new Date(clothesBuyAt)

            if(clothesBuyAtDate > todayDate){
                Swal.fire({
                    icon: "error",
                    title: "Validation Error",
                    text: "You can't set clothes buy at date more than today date",
                    confirmButtonText: "Okay!"
                });
                return
            }
        }
        formData.append("clothes_name", clothesName)
        formData.append("clothes_desc", clothesDesc)
        formData.append("clothes_merk", clothesMerk)
        formData.append("clothes_size", clothesSize)
        formData.append("clothes_gender", clothesGender)
        formData.append("clothes_made_from", clothesMadeFrom)
        formData.append("clothes_color", "black") // for now
        formData.append("clothes_category", clothesCategory)
        formData.append("clothes_type", clothesType)
        formData.append("clothes_price", clothesPrice)
        formData.append("clothes_buy_at", clothesBuyAt)
        formData.append("clothes_qty", clothesQty)
        formData.append("file", clothesImage)
        formData.append("is_faded", isFaded ? 1 : 0)
        formData.append("has_washed", hasWashed ? 1 : 0)
        formData.append("has_ironed", hasIroned ? 1 : 0)
        formData.append("is_favorite", isFavorite ? 1 : 0)
        formData.append("is_scheduled", isScheduled ? 1 : 0)

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes", formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
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
                    router.push(`/clothes/detail/${response.data.data.id}`)
                }
            });
        } 
    } catch (error) {
        messageError(error)
    }
}

export const postSchedule = async (day,isRemind,scheduleNote,tokenKey,props) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "day" : day,
            "is_remind" : isRemind,
            "schedule_note" : scheduleNote,
            "clothes_id" : props.id
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/schedule", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
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
                   props.fetchClothes()
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const postUsedClothes = async (usedContext,clothesNotes,tokenKey,props) => {
    try {
        const body = {
            "clothes_id" : props.id,
            "used_context" : usedContext,
            "clothes_note" : clothesNotes
        }

        Swal.showLoading()
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/history", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
                'Content-Type' : 'application/json'
            }
        })
        Swal.close()

        if(response.status === 201){
            Swal.fire({
                title: "Success!",
                text: response.data.message,
                icon: "success",
                allowOutsideClick: false,
                confirmButtonText: "Okay!"
            }).then((result) => {
                if (result.isConfirmed && props.fetchClothes) {
                   props.fetchClothes()
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}

export const postOutfitClothes = async (selectedItem,tokenKey,props) => {
    try {
        Swal.showLoading()

        // Payload
        const body = {
            "outfit_id" : props.id,
            "clothes" : JSON.stringify(selectedItem),
        }

        // Exec
        const response = await Axios.post("http://127.0.0.1:8000/api/v1/clothes/outfit/save/clothes", JSON.stringify(body), {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenKey}`,
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
                   props.fetchOutfit()
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: response.data.message,
                confirmButtonText: "Okay!"
            })
        }
    } catch (error) {
        messageError(error)
    }
}