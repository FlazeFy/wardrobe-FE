export const storeSession = async (name, val) => {
    try {
        val = Array.isArray(val) ? JSON.stringify(val) : val.trim()
        sessionStorage.setItem(name, val)
    } catch (error) {
        throw error
    }
}
  
export const getSession = async (name) => {
    try {
        return sessionStorage.getItem(name)
    } catch (error) {
        throw error
    }
}