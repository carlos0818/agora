export function convertTimeZone(datetime: string) {
    const d = new Date(`${ datetime } GMT+0`)
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const offset = d.getTimezoneOffset()/60*-1
    const bombay = utc + (3600000*offset)
    const nd = new Date(bombay)
    const day = nd.getDate() < 10 ? '0' + nd.getDate() : nd.getDate()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = monthNames[nd.getMonth()]
    const year = nd.getFullYear()
    const hour = nd.getHours() < 10 ? '0' + nd.getHours() : nd.getHours()
    const minutes = nd.getMinutes() < 10 ? '0' + nd.getMinutes() : nd.getMinutes()

    return `${ day } ${ month } ${ year } ${ hour }:${ minutes }`
}
