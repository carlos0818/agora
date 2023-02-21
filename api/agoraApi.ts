import axios from 'axios'

const agoraApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AGORA_API
})

export default agoraApi
