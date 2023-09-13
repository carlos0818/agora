import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './pitch-deck.module.css'

interface Props {
    id: string
}

const PitchDeckPage: NextPage<Props> = ({ id }) => {
    const { user } = useContext(AuthContext)

    const [isMyAccount, setIsMyAccount] = useState(false)
    const [pitchDeck, setPitchDeck] = useState<string | null>(null)

    useEffect(() => {
        getPitchDeck()
    }, [])

    useEffect(() => {
        if (user) {
            if (user.id.toString() === id) {
                setIsMyAccount(true)
            } else {
                setIsMyAccount(false)
            }
        }
    }, [user, id])
    
    const getPitchDeck = async() => {
        const { data } = await agoraApi.get(`/pitch-deck/get-pitch-deck-document?id=${ id }`)
        setPitchDeck(data.text)
    }

    const handleSave = async(event: ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.target.value
        await agoraApi.post('/pitch-deck/save-pitch-deck-document', { email: user?.email, id: user?.id, text })
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` }>
                <div className={ `window-glass-content` }>
                    {
                        isMyAccount ? (
                            <textarea
                                className={ `textfield ${ styles['textarea'] }` }
                                style={{ inlineSize: 'calc(100% - 30px)', blockSize: 700 }}
                                defaultValue={ pitchDeck! }
                                onBlur={ handleSave }
                                spellCheck={ false }
                            />
                        ) : (
                            <textarea
                                className={ `textfield ${ styles['textarea'] }` }
                                style={{ inlineSize: 'calc(100% - 30px)', blockSize: 700 }}
                                defaultValue={ pitchDeck! }
                                disabled
                                spellCheck={ false }
                            />
                        )
                    }
                </div>
            </div>
        </HomeLoginLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id = '' } = query

    return {
        props: {
            id
        }
    }
}

export default PitchDeckPage