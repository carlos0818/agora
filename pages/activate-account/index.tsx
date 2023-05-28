import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { agoraApi } from '@/api'

const ActivateAccount = () => {
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
        try {
            await agoraApi.get(`/user/activate-account?email=${ email }&token=${ token }`)
            setLoading(false)
            setTimeout(async() => {
                await signIn('credentials', { email, password: '', captcha: process.env.NEXT_PUBLIC_DEFAULT_CAPTCHA, loginToken: 'Y', token })
                window.location.href = '/'
            }, 3000)
        } catch (error: any) {
            setError(true)
            setErrorMessage(error.response.data.message)
            setLoading(false)
            setTimeout(() => {
                window.location.href = '/'
            }, 3000)
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