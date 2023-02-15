import axios from 'axios'

const overpassApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_OVERPASS_URL + '/api'
})

export default overpassApi
