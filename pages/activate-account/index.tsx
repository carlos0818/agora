import { agoraApi } from '@/api'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ActivateAccount = () => {
    const router = useRouter()

    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (typeof window !== undefined) {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            const email = urlParams.get('email')
            const token = urlParams.get('token')
            verifyToken(email || '', token || '')
        }
    }, [])

    const verifyToken = async(email: string, token: string) => {
        console.log('entró')
        try {
            const { data } = await agoraApi.get(`/user/activate-account?email=${ email }&token=${ token }`)
            console.log(data)
            setData(data)
            setLoading(false)
            setTimeout(async() => {
                await signIn('credentials', { email, password: '', captcha: process.env.NEXT_PUBLIC_DEFAULT_CAPTCHA, loginToken: 'Y', token })
                // router.push(process.env.NEXT_PUBLIC_REDIRECT_URL!)
                window.location.href = '/'
            }, 3000)
        } catch (error: any) {
            // setData('We cannot find your registered user')
            console.log(error)
            setError(true)
            setErrorMessage(error.response.data.message)
            setLoading(false)
            // setTimeout(() => {
            //     router.replace('/')
            // }, 3000)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBlockStart: 100 }}>
            <p style={{ color: '#10284F', fontFamily: 'ebrima-bold', fontSize: 20 }}>
                {
                    loading && 'Validating your account...'
                }
                {
                    (!loading && error)
                    && errorMessage
                }
                {
                    (!loading && !error)
                    && 'Your account has been activated'
                }
            </p>
        </div>
    )
}

export default ActivateAccount