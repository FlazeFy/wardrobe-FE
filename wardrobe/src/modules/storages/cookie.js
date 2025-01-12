export const storeCookie = (name, val, days = 7) => {
    if (typeof document === 'undefined') return

    try {
        let valueToStore = val

        if (Array.isArray(val)) {
            valueToStore = JSON.stringify(val)
        } else if (typeof val === 'string') {
            valueToStore = val.trim()
        }

        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        const expires = `expires=${date.toUTCString()}`

        document.cookie = `${name}=${encodeURIComponent(valueToStore)}; ${expires}; path=/`
    } catch (error) {
        console.error('Error storing cookie:', error)
    }
}

export const getCookie = (name) => {
    if (typeof document === 'undefined') return null

    try {
        const cookies = document.cookie.split('; ')
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=')
            if (key === name) {
                return decodeURIComponent(value)
            }
        }
        return null
    } catch (error) {
        console.error('Error getting cookie:', error)
        return null
    }
}
