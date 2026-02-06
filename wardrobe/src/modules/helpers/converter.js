export const getCleanTitleFromCtx = (val) => {
    try {
        const newVal = val.replaceAll('_', ' ')
        const cap = newVal.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        
        return cap
    } catch (error) {
        throw error
    }
}

export const getUTCHourOffset = () => {
    const offsetMi = new Date().getTimezoneOffset()
    const offsetHr = -offsetMi / 60
    return offsetHr
}

export const convertDatetimeBasedLocal = (datetime) => {
    const result = new Date(datetime)
    const offsetHours = getUTCHourOffset()
    result.setUTCHours(result.getUTCHours() + offsetHours)

    return `${result.getFullYear()}-${("0" + (result.getMonth() + 1)).slice(-2)}-${("0" + result.getDate()).slice(-2)} ${("0" + result.getHours()).slice(-2)}:${("0" + result.getMinutes()).slice(-2)}`
}

export const countDiffInDays = (val) => {
    try {
        const inputDate = new Date(val)
        if (isNaN(inputDate)) throw new Error("Invalid date format")

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        inputDate.setHours(0, 0, 0, 0)

        const diffInMs = today - inputDate
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

        return diffInDays
    } catch (error) {
        throw error;
    }
}

export const numberToPrice = (val) => {
    try {
        return val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val.toString()
    } catch (error) {
        throw error
    }
}

export const formatCurrency = (val) => {
    const currency_type = sessionStorage.getItem("currency_type") ?? 'Abbreviated Numeral'

    if(currency_type == 'Abbreviated Numeral'){
        return `Rp. ${numberToPrice(val)}`
    } else if(currency_type == 'Rupiah' || currency_type == 'Rupiah With Zero Sen'){
        return `Rp. ${commaThousandFormat(val)}${currency_type == 'Rupiah With Zero Sen' && '.00'}`
    } else if(currency_type == 'Rupiah Without Format'){
        return `Rp. ${val}`
    }
}

export const getErrorValidation = (val) => {
    let messages = []

    if(typeof val !== 'string'){
        Object.keys(val).forEach(key => {
            const error = val[key]
            if (Array.isArray(error)) {
                messages.push(...error)
            } else if (typeof error === 'string') {
                messages.push(error)
            }
        })

        messages = messages.join(', ').replaceAll('.','')
    } else {
        messages = val
    }

    return messages
}