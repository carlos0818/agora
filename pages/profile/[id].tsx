import { useRef, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { Activity } from '@/components/Profile/Activity'
import { Comment } from '@/components/Profile/Comment'

import { agoraApi } from '@/api'
import { useProfile } from '@/hooks/useProfile'

import styles from './my-profile.module.css'

import arrowDownIcon from '@/public/images/arrow-down.svg'

interface Props {
    id: string
    email: string
    fullname: string
    type: string
}

const ProfilePage: NextPage<Props> = ({ id, email, fullname, type }) => {
    const {
        isMyAccount,
        countries,
        user,
        loading,
        loadingPic,
        showRocket,
        profilePic,
        companyName,
        emailContact,
        city,
        countryId,
        country,
        address,
        phone,
        aboutUs,
        videoDesc,
        backPic,
        videoUrl,
        facebook,
        linkedin,
        twitter,
        companyNameRef,
        emailContactRef,
        fileInputRef,
        phoneRef,
        countryRef,
        cityRef,
        addressRef,
        entrepreneurData,
        percentage,
        onFileSelected,
        handleUpdateEntrepreneurInfo,
    } = useProfile(email, id, type)

    const aboutRef = useRef<HTMLTextAreaElement>(null)
    const videoDescRef = useRef<HTMLTextAreaElement>(null)

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [value3, setValue3] = useState(0)
    const [value4, setValue4] = useState(0)
    const [value5, setValue5] = useState(0)
    const [value6, setValue6] = useState(0)
    const [value7, setValue7] = useState(0)
    const [value8, setValue8] = useState(0)
    const [value9, setValue9] = useState(0)
    const [value10, setValue10] = useState(0)
    const [value11, setValue11] = useState(0)
    const [value12, setValue12] = useState(0)
    const [value13, setValue13] = useState(0)
    const [value14, setValue14] = useState(0)
    
    const handleValues = () => {
        setTimeout(() => {
            setValue1(70)
            setValue2(50)
            setValue3(80)
            setValue4(84)
            setValue5(67)
            setValue6(85)
            setValue7(54)
            setValue8(22)
            setValue9(48)
            setValue10(61)
            setValue11(77)
            setValue12(100)
            setValue13(39)
            setValue14(44)
        }, 100)
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            {
                loading
                ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBlockStart: 60 }}>
                        <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                    </div>
                ) : (
                    <>
                        <div className={ `window-glass` }>
                            <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                                <div className={ styles['cover-image-container'] }>
                                    {
                                        <Image
                                            src={ backPic ? backPic : '/images/user-background.jpg' }
                                            alt=''
                                            width={ 1280 }
                                            height={ 400 }
                                            className={ styles['cover-image'] }
                                        />
                                    }
                                    <div className={ `window-glass ${ styles['profile-image-container'] }` }>
                                        <div className={ `window-glass-content ${ styles['profile-image'] }` }>
                                            {
                                                profilePic && (
                                                    <Image
                                                        src={ decodeURI(profilePic) }
                                                        alt=''
                                                        className={ styles['profile-picture'] }
                                                        width={ 300 }
                                                        height={ 300 }
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['profile-info-container-mobile'] }>
                                    <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>{ companyName }</p>
                                    <p className={ styles['info-text'] }>by { fullname }</p>
                                    <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member 2 months ago</p>
                                    <div className={ styles['stars-container'] }>

                                    </div>
                                    <p className={ `${ styles['info-text'] }` }>{ city }-{ country }</p>
                                    <p className={ `${ styles['info-text'] }` }>{ address }</p>
                                    <p className={ `${ styles['info-text'] }` }>{ entrepreneurData?.web }</p>
                                    <p className={ `${ styles['info-text'] }` }>{ phone }</p>
                                    <div className={ styles['social-container'] }>
                                        {
                                            facebook && (
                                                <Link
                                                    href={ facebook }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a target='_blank'>
                                                        <Image src='/images/fb_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                    </a>
                                                </Link>
                                            )
                                        }
                                        {
                                            linkedin && (
                                                <Link
                                                    href={ linkedin }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a target='_blank'>
                                                        <Image src='/images/linkedin_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                    </a>
                                                </Link>
                                            )
                                        }
                                        {
                                            twitter && (
                                                <Link
                                                    href={ twitter }
                                                    passHref
                                                    prefetch={ false }
                                                    legacyBehavior
                                                >
                                                    <a target='_blank'>
                                                        <Image src='/images/twitter_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                    </a>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={ styles['profile-info-container-desktop'] }>
                                    <div className={ styles['profile-info-row1'] }>
                                        <div className={ styles['profile-info-content-left'] }>
                                            <p className={ `${ styles['info-text'] } ${ styles['company-name'] }` }>
                                                { companyName }
                                            </p>
                                            <p className={ `${ styles['info-text'] } ${ styles['user-name'] }` }>
                                                by { fullname }
                                            </p>
                                            <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>
                                                Member 2 months ago
                                            </p>
                                            <div className={ styles['stars-container'] }>
                                                <i className='icon-star' data-star="3.5"></i>
                                            </div>
                                        </div>
                                        <div className={ styles['profile-info-content-right'] }>
                                            <p className={ `${ styles['info-text'] }` }>
                                                { city } - { country }
                                            </p>
                                            <p className={ `${ styles['info-text'] }` }>
                                                { address }
                                            </p>
                                            <p className={ `${ styles['info-text'] }` }>
                                                { entrepreneurData?.web }
                                            </p>
                                            <p className={ `${ styles['info-text'] }` }>
                                                { phone }
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ marginInlineStart: 24, marginBlockStart: 20 }}>
                                        <div className={ styles['social-container'] }>
                                            {
                                                facebook && (
                                                    <Link
                                                        href={ facebook }
                                                        passHref
                                                        prefetch={ false }
                                                        legacyBehavior
                                                    >
                                                        <a target='_blank'>
                                                            <Image src='/images/fb_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                        </a>
                                                    </Link>
                                                )
                                            }
                                            {
                                                linkedin && (
                                                    <Link
                                                        href={ linkedin }
                                                        passHref
                                                        prefetch={ false }
                                                        legacyBehavior
                                                    >
                                                        <a target='_blank'>
                                                            <Image src='/images/linkedin_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                        </a>
                                                    </Link>
                                                )
                                            }
                                            {
                                                twitter && (
                                                    <Link
                                                        href={ twitter }
                                                        passHref
                                                        prefetch={ false }
                                                        legacyBehavior
                                                    >
                                                        <a target='_blank'>
                                                            <Image src='/images/twitter_logo.png' alt='Facebook Logo' width={ 30 } height={ 30 } />
                                                        </a>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            !(companyName && city && country && address && emailContact && phone) && isMyAccount && (
                                <div className={ `window-glass` }>
                                    <div className={ `window-glass-content` } style={{ padding: 16 }}>
                                        <p className={ styles['card-title'] }>Required information</p>
                                        <div className={ styles['required-text-container'] }>
                                            <div className={ styles['form-group'] }>
                                                <label>Company name</label>
                                                <input
                                                    ref={ companyNameRef }
                                                    type='text'
                                                    className={ `field ${ styles['textfield'] }` }
                                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'name') }
                                                />
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Profile picture</label>
                                                    {
                                                        !loadingPic ? (
                                                            <div style={{ inlineSize: 'calc(100% - 24px)' }}>
                                                                <input
                                                                    type='button'
                                                                    className={ `button-filled` }
                                                                    value='Upload image'
                                                                    onClick={ () => fileInputRef.current?.click() }
                                                                />
                                                                <input
                                                                    ref={ fileInputRef }
                                                                    type="file"
                                                                    accept='image/png, image/jpg, image/jpeg'
                                                                    style={{ display: 'none' }}
                                                                    onChange={ onFileSelected }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <em className='spinner blue-agora' style={{ blockSize: 24, inlineSize: 24 }} />
                                                        )
                                                    }
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Email contact</label>
                                                <input
                                                    ref={ emailContactRef }
                                                    type='text'
                                                    className={ `field ${ styles['textfield'] }` }
                                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'email_contact') }
                                                />
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Phone</label>
                                                <input
                                                    ref={ phoneRef }
                                                    type='text'
                                                    className={ `field ${ styles['textfield'] }` }
                                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'phone') }
                                                />
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Country</label>
                                                <div style={{ inlineSize: 'calc(100% - 24px)' }}>
                                                    <select
                                                        ref={ countryRef }
                                                        className={`select field ${ styles['select'] }` }
                                                        style={{ borderRadius: 100 }}
                                                        onChange={ (event) => handleUpdateEntrepreneurInfo(event, 'country') }
                                                        defaultValue={ countryId }
                                                    >
                                                        {
                                                            countries.map(country => (
                                                                <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>City</label>
                                                <input
                                                    ref={ cityRef }
                                                    type='text'
                                                    className={ `field ${ styles['textfield'] }` }
                                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'city') }
                                                />
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Address</label>
                                                <input
                                                    ref={ addressRef }
                                                    type='text'
                                                    className={ `field ${ styles['textfield'] }` }
                                                    onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'address') }
                                                />
                                            </div>
                                        </div>
                                        <p className={ styles['required-description'] }>
                                            In order to move forward with the process, we kindly request that you provide us with the necessary information as mentioned above.
                                            This information is crucial to ensure a smooth and efficient process.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        {
                            showRocket && isMyAccount && (
                                <Link
                                    href='/questionnaire'
                                    passHref
                                    prefetch={ false }
                                    legacyBehavior
                                >
                                    <div className={ `window-glass` } style={{ cursor: 'pointer' }}>
                                        <div className={ `window-glass-content` }>
                                            <div className={ styles['progress-container'] }>
                                                <progress className={ styles['progress-bar'] } value={ percentage > 100 ? 100 : percentage } max="100" />
                                            </div>
                                            <div className={ styles['progress-image'] }>

                                            </div>
                                            <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p>
                                            <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        {
                            (!showRocket && (companyName && city && country && address && emailContact && phone)) && (
                                <>
                                    <div className={ `window-glass` }>
                                        <div className={ `window-glass-content` } style={{ padding: 16 }}>
                                            <p className={ styles['card-title'] }>About us</p>
                                            {
                                                isMyAccount ? (
                                                    <textarea
                                                        ref={ aboutRef }
                                                        className='textfield'
                                                        style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
                                                        defaultValue={ aboutUs }
                                                        onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'aboutus') }
                                                    />
                                                ) : (
                                                    <p className={ styles['about-description'] }>
                                                        { aboutUs }
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className={ `window-glass` }>
                                        <div className={ `window-glass-content ${ styles['video-container'] }` }>
                                            {
                                                videoUrl ? (
                                                    <video controls className={ styles['video'] }>
                                                        <source src={ videoUrl } />
                                                    </video>
                                                ) : (
                                                    <div className={ styles['video'] }></div>
                                                )
                                            }
                                            <div className={ styles['video-text-container'] }>
                                                <p className={ styles['card-title'] }>Video</p>
                                                {
                                                    isMyAccount ? (
                                                        <textarea
                                                            ref={ videoDescRef }
                                                            className='textfield'
                                                            style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
                                                            defaultValue={ videoDesc }
                                                            onBlur={ (event) => handleUpdateEntrepreneurInfo(event, 'videodesc') }
                                                        />
                                                    ) : (
                                                        <p className={ styles['video-description'] }>
                                                            { videoDesc }
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        user?.type === 'E' && (
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
                                        )
                                    }
                                    {
                                        user?.type === 'E' && (
                                            <div className={ `window-glass` }>
                                                <div className={ `window-glass-content ${ styles['window-content'] }` }>
                                                    <div style={{ position: 'relative' }}>
                                                        <details className={ styles['title-container'] }>
                                                            <summary className={ styles['accordion-title'] } onClick={ handleValues }>
                                                                Qualification
                                                                <Image
                                                                    src={ arrowDownIcon }
                                                                    alt=''
                                                                    style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                                                />
                                                            </summary>
                                                            <div className={ styles['accordion-content'] }>
                                                                <div className={ styles['qualification-section-container'] }>
                                                                    <hr className={ styles['center-line'] } />

                                                                    <p className={ styles['texts'] }>Future prospect and Innovation projects</p>

                                                                    <span></span>
                                                                    <progress className={ styles['progress-bar-qualification'] } value={ value1 } max="100" />
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Outlook</p>

                                                                    <span></span>
                                                                    <progress className={ styles['progress-bar-qualification'] } value={ value2 } max="100" />
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Innovations Projects</p>
                                                                </div>
                                                                <div className={ styles['qualification-section-container'] }>
                                                                    <hr className={ styles['center-line'] } />

                                                                    <p className={ styles['texts'] }>Governance and enterprise risk management (ERM)</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value3 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Governance</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value4 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Enterprise Risk Management</p>
                                                                </div>
                                                                <div className={ styles['qualification-section-container'] }>
                                                                    <hr className={ styles['center-line'] } />

                                                                    <p className={ `${ styles['texts'] } ${ styles['group-risk'] }` }>Risk assessment</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value5 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Credit risk</p>

                                                                    <span></span>
                                                                    <progress className={ styles['progress-bar-qualification'] } value={ value6 } max="100" />
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Market risk</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value7 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Country risk</p>

                                                                    <span></span>
                                                                    <progress className={ styles['progress-bar-qualification'] } value={ value8 } max="100" />
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Operational risk</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value9 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Business and strategic risk</p>

                                                                    <span></span>
                                                                    <progress className={ styles['progress-bar-qualification'] } value={ value10 } max="100" />
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Social and environment risk</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value11 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Funding liquidity and Solvency risk</p>
                                                                </div>
                                                                <div className={ styles['qualification-section-container'] }>
                                                                    <hr className={ styles['center-line'] } />

                                                                    <p className={ `${ styles['texts'] } ${ styles['group-sdg'] }` }>Type of SME and Sustainable Development Goals (SDG)</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value12 } max="100" />
                                                                    <p></p>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>SDGs and impact</p>
                                                                </div>
                                                                <div className={ styles['qualification-section-container'] }>
                                                                    <hr className={ styles['center-line'] } />

                                                                    <p className={ styles['texts'] }>Business strategy market conditions</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value13 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Market conditions</p>

                                                                    <progress className={ `${ styles['progress-bar-qualification'] } ${ styles['right'] }` } value={ value14 } max="100" />
                                                                    <span></span>
                                                                    <p className={ `${ styles['texts'] } ${ styles['texts-right'] }` }>Business lines strategy</p>
                                                                </div>
                                                            </div>
                                                        </details>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {/* <div className={ `window-glass` }>
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
                                    </div> */}
                                    {/* <div className={ `window-glass` }>
                                        <div className={ `window-glass-content` } style={{ padding: 16 }}>
                                            <p className={ styles['card-title'] }>Activity</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>
                                                <Activity
                                                    title='Make happy'
                                                    date='2 weeks ago'
                                                    description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />

                                                <Activity
                                                    title='The new dream'
                                                    date='1 week ago'
                                                    description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />

                                                <Activity
                                                    title='Best plan'
                                                    date='1 week ago'
                                                    description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />

                                                <Activity
                                                    title='Raise your business'
                                                    date='1 week ago'
                                                    description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />

                                                <Activity
                                                    title='We all together'
                                                    date='1 week ago'
                                                    description='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className={ `window-glass` }>
                                        <div className={ `window-glass-content` } style={{ padding: 16 }}>
                                            <p className={ styles['card-title'] }>Comments</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>
                                                <Comment
                                                    name='Nidia Sanchez'
                                                    date='Monday 22th Jun'
                                                    comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />
                                                <Comment
                                                    name='Raul Rodriguez'
                                                    date='Tuesday 13th May'
                                                    comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />
                                                <Comment
                                                    name='Martha Camacho'
                                                    date='Friday 08th Apr'
                                                    comment='Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Los Lorem Ipsum ha sido el texto de relleno estándar de las industrias...'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
        </HomeLoginLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }
    let email = ''
    let fullname = ''
    let type = ''

    try {
        await agoraApi.get(`/question/validate-complete-questionnaire-by-id?id=${ id }`)
        const { data } = await agoraApi.get(`/user/is-my-account?id=${ id }`)
        email = data.email
        fullname = data.fullname
        type = data.type
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            id,
            email,
            fullname,
            type,
        }
    }
}

export default ProfilePage