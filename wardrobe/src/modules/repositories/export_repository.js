import apiCall from '@/configs/axios'
import Swal from 'sweetalert2'
import { getCleanTitleFromCtx } from '../helpers/converter'
import { messageError } from '../helpers/message'

const MODULE_URL = "/api/v1/export"

export const getExportRepo = async (ctx, type) => {
    try {
        Swal.showLoading()
        const response = await apiCall.get(`${MODULE_URL}/${ctx}/${type}`, {
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            responseType: 'blob'
        })
        Swal.close()

        if(response.status === 200){
            const contentDisposition = response.headers['content-disposition']
            const fileName = contentDisposition && contentDisposition.match(/filename="(.+)"/) ? contentDisposition.match(/filename="(.+)"/)[1] : `${ctx}_data.${type == 'excel' ? 'xlsx' : 'pdf'}`

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()

            Swal.fire({
                title: "Success!",
                text: `${getCleanTitleFromCtx(ctx)} data downloaded`,
                icon: "success",
                confirmButtonText: "Okay!"
            })
        } 
    } catch (error) {
        messageError(error)
    }
}

export const getExportRepoCalendarRepo = async (type, target, fileName, ctx) => {
    try {
        Swal.showLoading()
        const response = await apiCall.get(`${MODULE_URL}/clothes/calendar/${type}/${target}`, {
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            responseType: 'blob'
        })
        Swal.close()

        if(response.status === 200){
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()

            Swal.fire({
                title: "Success!",
                text: `Calendar ${ctx} downloaded`,
                icon: "success",
                confirmButtonText: "Okay!"
            })
        } 
    } catch (error) {
        messageError(error)
    }
}

export const getExportRepoClothesDetailRepo = async (id) => {
    try {
        Swal.showLoading()
        const response = await apiCall.get(`${MODULE_URL}/clothes/detail/pdf/${id}`, {
            responseType: 'blob'
        })
        Swal.close()

        if(response.status === 200){
            const fileName = `clothes-detail-${id}.pdf`

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            link.remove()

            Swal.fire({
                title: "Success!",
                text: `Clothes detail downloaded`,
                icon: "success",
                confirmButtonText: "Okay!"
            })
        } 
    } catch (error) {
        messageError(error)
    }
}