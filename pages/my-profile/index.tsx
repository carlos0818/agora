import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './my-profile.module.css'

import rocketProgressIcon from '@/public/images/rocket-progress.svg'
import arrowDownIcon from '@/public/images/arrow-down.svg'

const MyProfilePage: NextPage = () => {
    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                        <div className={ styles['cover-image'] }>
                            <div className={ `window-glass ${ styles['profile-image-container'] }` }>
                                <div className={ `window-glass-content ${ styles['profile-image'] }` }>

                                </div>
                            </div>
                        </div>
                        <div className={ styles['profile-info-container-mobile'] }>
                            <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>QuarkLink</p>
                            <p className={ styles['info-text'] }>by Carlos Benavides</p>
                            <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                            <div className={ styles['stars-container'] }>

                            </div>
                            <p className={ `${ styles['info-text'] }` }>Lima, Lima - Perú</p>
                            <p className={ `${ styles['info-text'] } ${ styles['address-text'] }` }>Insert your address</p>
                            <p className={ `${ styles['info-text'] }` }>www.brimstonenergy.com</p>
                            <p className={ `${ styles['info-text'] }` }>+151004285311</p>
                            <div className={ styles['social-container'] }>

                            </div>
                        </div>
                        <div className={ styles['profile-info-container-desktop'] }>
                            <div className={ styles['profile-info-row1'] }>
                                <div className={ styles['profile-info-content-left'] }>
                                    <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>QuarkLink</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['user-name'] }` }>by Carlos Benavides</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                                    <div className={ styles['stars-container'] }>
                                        <i className='icon-star' data-star="3.5"></i>
                                    </div>
                                </div>
                                <div className={ styles['profile-info-content-right'] }>
                                    <p className={ `${ styles['info-text'] }` }>Lima, Lima - Perú</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['address-text'] }` }>Insert your address</p>
                                    <p className={ `${ styles['info-text'] }` }>https://www.quarklink.com</p>
                                    <p className={ `${ styles['info-text'] }` }>+51991049432</p>
                                </div>
                            </div>
                            <div style={{ marginInlineStart: 24, marginBlockStart: 20 }}>
                                <div className={ styles['social-container'] }>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>Required information</p>
                        <div className={ styles['required-text-container'] }>
                            <p className={ styles['required-text'] }>Youtube video</p>
                            <p className={ styles['required-text'] }>Profile photo</p>
                            <p className={ styles['required-text'] }>Email contact</p>
                            <p className={ styles['required-text'] }>Phone</p>
                            <p className={ styles['required-text'] }>Address</p>
                        </div>
                        <p className={ styles['required-description'] }>
                            In order to move forward with the process, we kindly request that you provide us with the necessary information as mentioned above.
                            This information is crucial to ensure a smooth and efficient process.
                        </p>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` }>
                        <div className={ styles['progress-container'] }>
                            <progress className={ styles['progress-bar'] } value="100" max="100" />
                            <Image
                                src={ rocketProgressIcon }
                                alt='Rocket image'
                                className={ styles['rocket-image'] }
                            />
                        </div>
                        <div className={ styles['progress-image'] }>

                        </div>
                        <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p>
                        <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>About us</p>
                        <p className={ styles['about-description'] }>
                            We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                            dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                            food security and the environment of North Eastern Uganda.
                        </p>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content ${ styles['video-container'] }` }>
                        <div className={ styles['video'] }>

                        </div>
                        <div className={ styles['video-text-container'] }>
                            <p className={ styles['card-title'] }>Video</p>
                            <p className={ styles['video-description'] }>
                                We promote the growing, protection and consumption of Moringa and Shea nut health and skin Care products. We produce Aica Moringa
                                dried leaf powder, tea leaves, Moringa seed oil, Shea nut butter, Moringa and shea cosmetics for the improvement of the livelihoods,
                                food security and the environment of North Eastern Uganda.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] }>
                                    Pitch Deck
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <p className={ styles['accordion-content'] }>
                                    Pitch Deck content
                                </p>
                            </details>
                            
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] }>
                                    Qualification
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <p className={ styles['accordion-content'] }>
                                    Qualification content
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <div style={{ position: 'relative' }}>
                            <details className={ styles['title-container'] }>
                                <summary className={ styles['accordion-title'] }>
                                    Technical Support
                                    <Image
                                        src={ arrowDownIcon }
                                        alt=''
                                        style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                    />
                                </summary>
                                <p className={ styles['accordion-content'] }>
                                    Technical Support content
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
                <div className={ `window-glass` }>
                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                        <p className={ styles['card-title'] }>Activity</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>

                            <div className={ styles['activity-container'] }>
                                <div className={ styles['activity-title-actions-container'] }>
                                    <p className={ styles['activity-title'] }>Make happy</p>
                                    <div style={{ border: '1px solid red', inlineSize: 120 }}>

                                    </div>
                                </div>
                                <p className={ styles['activity-date'] }>2 weeks ago</p>
                                <p className={ styles['activity-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto
                                    de relleno estándar de las industrias...
                                </p>
                            </div>

                            <div className={ styles['activity-container'] }>
                                <div className={ styles['activity-title-actions-container'] }>
                                    <p className={ styles['activity-title'] }>The new dream</p>
                                    <div style={{ border: '1px solid red', inlineSize: 120 }}>

                                    </div>
                                </div>
                                <p className={ styles['activity-date'] }>2 weeks ago</p>
                                <p className={ styles['activity-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto
                                    de relleno estándar de las industrias...
                                </p>
                            </div>

                            <div className={ styles['activity-container'] }>
                                <div className={ styles['activity-title-actions-container'] }>
                                    <p className={ styles['activity-title'] }>Best plan</p>
                                    <div style={{ border: '1px solid red', inlineSize: 120 }}>

                                    </div>
                                </div>
                                <p className={ styles['activity-date'] }>2 weeks ago</p>
                                <p className={ styles['activity-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto
                                    de relleno estándar de las industrias...
                                </p>
                            </div>

                            <div className={ styles['activity-container'] }>
                                <div className={ styles['activity-title-actions-container'] }>
                                    <p className={ styles['activity-title'] }>Raise your business</p>
                                    <div style={{ border: '1px solid red', inlineSize: 120 }}>

                                    </div>
                                </div>
                                <p className={ styles['activity-date'] }>2 weeks ago</p>
                                <p className={ styles['activity-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto
                                    de relleno estándar de las industrias...
                                </p>
                            </div>

                            <div className={ styles['activity-container'] }>
                                <div className={ styles['activity-title-actions-container'] }>
                                    <p className={ styles['activity-title'] }>We all together</p>
                                    <div style={{ border: '1px solid red', inlineSize: 120 }}>

                                    </div>
                                </div>
                                <p className={ styles['activity-date'] }>2 weeks ago</p>
                                <p className={ styles['activity-description'] }>
                                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto
                                    de relleno estándar de las industrias...
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        </HomeLoginLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            // user: session.user
        }
    }
}

export default MyProfilePage