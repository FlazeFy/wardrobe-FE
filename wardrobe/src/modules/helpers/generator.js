export const getCurrentMonthYear = () => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    
    return `${month}-${year}`
};