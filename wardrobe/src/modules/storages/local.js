export const storeLocal = (name,val) => {
    try {
        if (Array.isArray(val) && val != false && val != true) {
            val = JSON.stringify(val)
        } else {
            val = val == null || typeof val === "boolean" ? val : val.trim()
        }
        localStorage.setItem(name, val)
    } catch (error) {
        throw error
    }
}

export const getLocal = (name) => {
    try {
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') return window.localStorage.getItem(name)
        return null
    } catch (error) {
        throw error
    }
}
