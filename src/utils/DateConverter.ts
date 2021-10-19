export const convertUTCtoDates = (utc : any) => {
    const date = new Date(utc);
    const month = `${date.getMonth()+1}`.length === 1 ? `0${date.getMonth()+1}` : date.getMonth()+1
    const dateOfDay = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : date.getDate()
    const hours = `${date.getHours()}`.length === 1 ? `0${date.getHours()}` : date.getHours()
    const minute = `${date.getMinutes()}`.length === 1 ? `0${date.getMinutes()}` : date.getMinutes()

    return date.getFullYear()+"-"+month+"-"+dateOfDay+" "+hours+":"+minute
}