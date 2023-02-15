import axios from 'axios'

const overpassApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GLOBALECONOMY_URL,
    headers: {
        // 'Accept': 'application/xml',
        'Content-Type': 'text/xml; charset=UTF-8'
    }
})

export default overpassApi
