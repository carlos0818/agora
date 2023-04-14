import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import style from './signup.module.css'

const index: NextPage = () => {
    const { query } = useRouter()

    // console.log(router.query.type)

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ style['signup-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 1200 }}>
                    <div className='window-glass-content'>
                        <p className={ style['account-title'] }>CREATE YOUR ACCOUNT AS { query.type?.toString().toUpperCase() }</p>
                        <form className={ style['form-container'] }>
                            {/* <div className={ style['form-container'] }> */}
                                <div className={ style['form-row'] }>
                                    <label>Full name</label>
                                    <input type='text' />
                                </div>
                                {/* <div></div> */}
                                <div className={ style['form-row'] }>
                                    <label>Your e-mail</label>
                                    <input type='email' />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Country</label>
                                    <input type='text' />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Password</label>
                                    <input type='password' />
                                </div>
                                <div className={ style['form-row'] }>
                                    <label>Confirm your password</label>
                                    <input type='password' />
                                </div>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default index