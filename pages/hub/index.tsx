import { Fragment, useEffect, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { AgoraLayout } from '@/components/layouts/AgoraLayout'

import styles from './hub.module.css'

const HubPage: NextPage = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])

    useEffect(() => {
        getHub()
    }, [])

    const getHub = async() => {
        setLoading(true)
        const { data } = await agoraApi.get('/comment-info/get-hub')
        setData(data)
        setLoading(false)
    }

    return (
        <AgoraLayout title='Agora' pageDescription=''>
            <div className={ styles['hub-container'] }>
                <div className='window-glass' style={{ maxInlineSize: 1280, margin: 'auto' }}>
                    <div className='window-glass-content' style={{ display: 'flex', flexDirection: 'column', gap: 20, color: '#10284F' }}>
                        {
                            loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                                </div>
                            ) : (
                                <>
                                    {
                                        data.map((titles: any) => {
                                            return (
                                                <Fragment key={ titles.title }>
                                                    <h3 className={ styles['title'] }>{ titles.title }</h3>
                                                    {
                                                        titles.level1.map((levels1: any) => {
                                                            return (
                                                                <details
                                                                    key={ levels1.name }
                                                                    className={ styles['details'] }
                                                                >
                                                                    <summary className={ styles['accordion-title'] }>
                                                                        { levels1.name }
                                                                        <Image
                                                                            src='/images/arrow-down.svg'
                                                                            className={ styles['arrow'] }
                                                                            alt=''
                                                                            width={ 24 }
                                                                            height={ 24 }
                                                                        />
                                                                    </summary>
                                                                    <div className={ styles['accordion-content'] } style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBlock: 20, marginInlineStart: 20 }}>
                                                                        {
                                                                            levels1.level2.map((level2: any) => {
                                                                                return (
                                                                                    <details
                                                                                        key={ level2.name }
                                                                                        id='entrepreneurs'
                                                                                        className={ styles['details'] }
                                                                                    >
                                                                                        <summary className={ styles['accordion-title'] }>
                                                                                            { level2.name }
                                                                                            <Image
                                                                                                src='/images/arrow-down.svg'
                                                                                                className={ styles['arrow'] }
                                                                                                alt=''
                                                                                                width={ 24 }
                                                                                                height={ 24 }
                                                                                            />
                                                                                        </summary>
                                                                                        <div className={ styles['accordion-content'] } style={{ marginBlockStart: 20 }}>
                                                                                            <textarea
                                                                                                className={ styles['textarea'] }
                                                                                                readOnly
                                                                                                spellCheck={ false }
                                                                                                defaultValue={ level2.body }
                                                                                            />
                                                                                        </div>
                                                                                    </details>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </details>
                                                            )
                                                        })
                                                    }
                                                </Fragment>
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </AgoraLayout>
    )
}

export default HubPage