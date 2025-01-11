export const getCleanTitleFromCtx = (val) => {
    try {
        const newVal = val.replaceAll('_', ' ')
        const cap = newVal.split(" ").
            map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        
        return cap
    } catch (error) {
        throw error
    }
}

export const countDiffInDays = (val) => {
    try {
        const inputDate = new Date(val)
        if (isNaN(inputDate)) {
            throw new Error("Invalid date format")
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        inputDate.setHours(0, 0, 0, 0)

        const diffInMs = today - inputDate
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24))

        return diffInDays
    } catch (error) {
        throw error;
    }
};


export const numberToPrice = (val) => {
    try {
        if (val >= 1000) {
            const res = (val / 1000).toFixed(0)
            return res + 'K'
        } else {
            return val.toString()
        }
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