import { Fragment, useEffect, useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { Activity } from '@/components/Profile/Activity'
import { Comment } from '@/components/Profile/Comment'
import { ModalCard } from '@/components/Common/ModalCard'

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
        language,
        video1,
        video2,
        video3,
        video4,
        video5,
        video6,
        video7,
        video8,
        video9,
        video10,
        video11,
        video12,
        isMyAccount,
        countries,
        user,
        loading,
        loadingPic,
        hideRocket,
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
        since,
        companyNameRef,
        emailContactRef,
        fileInputRef,
        phoneRef,
        countryRef,
        cityRef,
        addressRef,
        aboutUsRef,
        videoDescRef,
        entrepreneurData,
        percentage,
        sendRequest,
        messageRequest,
        comments,
        comment,
        validateFriend,
        averageVote,
        pitchDeck,
        setComment,
        onFileSelected,
        handleUpdateEntrepreneurInfo,
        handleSendRequest,
        handleComment,
        getAverageVotes,
    } = useProfile(email, id, type)

    const [showVote, setShowVote] = useState(false)
    const [stars, setStars] = useState(0)

    const [data, setData] = useState<any>([])

    useEffect(() => {
        if (user)
            getScore()
    }, [user])

    const onChangeValue = (event: any) => {
        setStars(event.target.value);
    }

    const handleSaveVote = async() => {
        await agoraApi.post('/vote/user-vote', { email: user?.email, id, vote: stars.toString() })
        setShowVote(false)
        getAverageVotes()
    }

    const getScore = async() => {
        const { data } = await agoraApi.get(`/entrepreneur/get-score?email=${ user?.email }`)
        setData(data)
    }

    const handleProgressValues = () => {
        setTimeout(() => {
            const progressBars = document.getElementsByClassName('progress-score') as HTMLCollectionOf<HTMLProgressElement>
            const titles = []
    
            for (let i=0; i<data.length; i++) {
                console.log(data[i])
                for (let j=0; j<data[i].titles.length; j++) {
                    titles.push(data[i].titles[j].score)
                }
            }
    
            for (let i=0; i<progressBars.length; i++) {
                progressBars[i].value = titles[i]
            }
        }, 10)
    }

    const handleChangeVideo = (video: string) => {
        const $videotutorial = document.getElementById('videotutorial') as HTMLVideoElement
        const $video = document.getElementById(video) as HTMLVideoElement
        $videotutorial.src = $video.getAttribute('data-url')!
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
                                    <p className={ `${ styles['info-text'] } ${ styles['member-text'] }` }>Member since { since }</p>
                                    <div className={ styles['stars-container'] }>
                                        <em className='icon-star' data-star={ averageVote } style={{ fontSize: 13 }}></em>
                                        {
                                            (!isMyAccount && validateFriend) && (
                                                <p
                                                    className={ `${ styles['info-text'] } ${ styles['vote'] }` }
                                                    onClick={ () => setShowVote(true) }
                                                >
                                                    Vote
                                                </p>
                                            )
                                        }
                                    </div>
                                    <p className={ `${ styles['info-text'] }` }>{ city }-{ country }</p>
                                    <p className={ `${ styles['info-text'] }` }>{ address }</p>
                                    <p className={ `${ styles['info-text'] }` }>{ entrepreneurData?.web }</p>
                                    {
                                        (sendRequest || user?.email === email) && (
                                            <>
                                                <p className={ `${ styles['info-text'] }` }>{ emailContact }</p>
                                                <p className={ `${ styles['info-text'] }` }>{ phone }</p>
                                            </>
                                        )
                                    }
                                    {
                                        (!isMyAccount && validateFriend) && (
                                            <div className={ styles['social-container'] }>
                                                {
                                                    facebook && (
                                                        <Link
                                                            href={ `https://www.facebook.com/${ facebook }` }
                                                            passHref
                                                            prefetch={ false }
                                                            legacyBehavior
                                                        >
                                                            <a target='_blank'>
                                                                <Image src='/images/fb_logo.png' alt='Facebook Logo' width={ 20 } height={ 20 } />
                                                            </a>
                                                        </Link>
                                                    )
                                                }
                                                {
                                                    linkedin && (
                                                        <Link
                                                            href={ `https://www.linkedin.com/in/${ linkedin }` }
                                                            passHref
                                                            prefetch={ false }
                                                            legacyBehavior
                                                        >
                                                            <a target='_blank'>
                                                                <Image src='/images/linkedin_logo.png' alt='Facebook Logo' width={ 20 } height={ 20 } />
                                                            </a>
                                                        </Link>
                                                    )
                                                }
                                                {
                                                    twitter && (
                                                        <Link
                                                            href={ `https://www.twitter.com/${ twitter }` }
                                                            passHref
                                                            prefetch={ false }
                                                            legacyBehavior
                                                        >
                                                            <a target='_blank'>
                                                                <Image src='/images/twitter_logo.png' alt='Facebook Logo' width={ 20 } height={ 20 } />
                                                            </a>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        messageRequest && <span style={{ color: '#006f0d', fontFamily: 'ebrima', fontSize: 13 }}>Your contact request has been sent</span>
                                    }
                                    {
                                        (!sendRequest && user?.email !== email) && (
                                            <button
                                                className='button-outline'
                                                style={{ marginBlockStart: 12 }}
                                                onClick={ handleSendRequest }
                                            >
                                                Connect
                                            </button>
                                        )
                                    }
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
                                                Member since { since }
                                            </p>
                                            <div className={ styles['stars-container'] }>
                                                <em className='icon-star' data-star={ averageVote }></em>
                                                {
                                                    (!isMyAccount && validateFriend) && (
                                                        <p
                                                            className={ `${ styles['info-text'] } ${ styles['vote'] }` }
                                                            onClick={ () => setShowVote(true) }
                                                        >
                                                            Vote
                                                        </p>
                                                    )
                                                }
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
                                            {
                                                (sendRequest || user?.email === email) && (
                                                    <>
                                                        <p className={ `${ styles['info-text'] }` }>
                                                            { emailContact }
                                                        </p>
                                                        <p className={ `${ styles['info-text'] }` }>
                                                            { phone }
                                                        </p>
                                                    </>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                    {
                                        (!isMyAccount && validateFriend) && (
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginInline: 24, marginBlockStart: 20 }}>
                                                <div className={ styles['social-container'] }>
                                                    {
                                                        facebook && (
                                                            <Link
                                                                href={ `https://www.facebook.com/${ facebook }` }
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
                                                                href={ `https://www.linkedin.com/in/${ linkedin }` }
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
                                                                href={ `https://www.twitter.com/${ twitter }` }
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
                                                {
                                                    messageRequest && <span style={{ color: '#006f0d', fontFamily: 'ebrima' }}>Your contact request has been sent</span>
                                                }
                                                {
                                                    (!sendRequest && user?.email !== email) && (
                                                        <button
                                                            className='button-outline'
                                                            onClick={ handleSendRequest }
                                                        >
                                                            Connect
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            (user?.required === 0 && isMyAccount) && (
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
                            !hideRocket && isMyAccount && (
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
                                            {/* <p className={ styles['progress-title'] }>CONGRATULATIONS!!!</p> */}
                                            <p className={ styles['progress-description'] }>Click here to continue with your profile</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        {
                            (hideRocket && user?.required === 1) && (
                                <>
                                    <div className={ `window-glass` }>
                                        <div className={ `window-glass-content` } style={{ padding: 16 }}>
                                            <p className={ styles['card-title'] }>About us</p>
                                            {
                                                isMyAccount ? (
                                                    <textarea
                                                        ref={ aboutUsRef }
                                                        className='textfield'
                                                        style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
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
                                    {
                                        (isMyAccount || (!isMyAccount && videoDesc && videoUrl)) && (
                                            <div className={ `window-glass` }>
                                                <div className={ `window-glass-content ${ styles['video-container'] }` }>
                                                    {
                                                        (isMyAccount && !videoUrl) ? (
                                                            <video id='videotutorial' controls className={ styles['video'] }>
                                                                <source
                                                                    src={ video1 }
                                                                    type="video/webm"
                                                                />
                                                            </video>
                                                        )
                                                        : videoUrl ? (
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
                                                            (isMyAccount && !videoUrl) ?
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, inlineSize: '100%', marginBlockStart: 8 }}>
                                                                    <a
                                                                        id='videotutorial1'
                                                                        data-url={ video1 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial1') }
                                                                    >
                                                                        Cracking the Investor pitch
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial2'
                                                                        data-url={ video2 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial2') }
                                                                    >
                                                                        Introduction
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial3'
                                                                        data-url={ video3 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial3') }
                                                                    >
                                                                        Problem statement
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial4'
                                                                        data-url={ video4 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial4') }
                                                                    >
                                                                        Solution showcase
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial5'
                                                                        data-url={ video5 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial5') }
                                                                    >
                                                                        Unique value proposition
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial6'
                                                                        data-url={ video6 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial6') }
                                                                    >
                                                                        Market opportunity
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial7'
                                                                        data-url={ video7 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial7') }
                                                                    >
                                                                        Business model
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial8'
                                                                        data-url={ video8 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial8') }
                                                                    >
                                                                        Traction and milestones
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial9'
                                                                        data-url={ video9 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial9') }
                                                                    >
                                                                        Team introduction
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial10'
                                                                        data-url={ video10 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial10') }
                                                                    >
                                                                        Go-to-market strategy
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial11'
                                                                        data-url={ video11 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial11') }
                                                                    >
                                                                        Financial projections
                                                                    </a>
                                                                    <a
                                                                        id='videotutorial12'
                                                                        data-url={ video12 }
                                                                        style={{ color: '#10284F', cursor: 'pointer', textDecoration: 'none' }}
                                                                        onClick={ () => handleChangeVideo('videotutorial12') }
                                                                    >
                                                                        Call to action
                                                                    </a>
                                                                </div>
                                                            : isMyAccount ? (
                                                                <textarea
                                                                    ref={ videoDescRef }
                                                                    className='textfield'
                                                                    style={{ blockSize: 150, inlineSize: 'calc(100% - 25px)' }}
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
                                        )
                                    }
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
                                                            <div className={ styles['accordion-content'] }>
                                                                {
                                                                    !pitchDeck && (
                                                                        <>
                                                                            <p>
                                                                                A successful entrepreneur needs to be able to effectively communicate the essence of their
                                                                                business in a very limited period of time and capture the interest of investors, potential
                                                                                partners, and other key stakeholders. This is where the &quot;Pitch Deck&quot; comes into play. A Pitch
                                                                                Deck is a presentation that succinctly and attractively summarizes the most important aspects
                                                                                of a business.
                                                                            </p>
                                                                            <button
                                                                                className='button-filled'
                                                                                style={{ marginBlockStart: 20 }}
                                                                            >
                                                                                Generate Pitch Deck with AI
                                                                            </button>
                                                                        </>
                                                                    )
                                                                }
                                                            </div>
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
                                                            <summary className={ styles['accordion-title'] } onClick={ handleProgressValues }>
                                                                Qualification
                                                                <Image
                                                                    src={ arrowDownIcon }
                                                                    alt=''
                                                                    style={{ position: 'absolute', marginBlockStart: 6, top: 0, right: 10 }}
                                                                />
                                                            </summary>
                                                            <div className={ styles['accordion-content'] }>
                                                                {
                                                                    data.map((score: any) => (
                                                                        <div key={ score.maintitle } className={ styles['qualification-section-container'] }>
                                                                            <hr className={ styles['center-line'] } />

                                                                            <p className={ `${ styles['texts'] } ${ styles[`group-${ score.countTitles }`] }` }>
                                                                                { score.maintitle }
                                                                            </p>
                                                                            {
                                                                                score.titles.map((title: any) => (
                                                                                    <Fragment key={ title.title }>
                                                                                        <p className={ styles['texts'] }>{ title.title }</p>
                                                                                        <progress
                                                                                            className={ `${ styles['progress-bar-qualification'] } progress-score` }
                                                                                            // value={ score.score }
                                                                                            max="100"
                                                                                        />
                                                                                    </Fragment>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
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
                                            <p className={ styles['card-title'] }>Community Testimonials</p>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBlockStart: 24 }}>
                                                {
                                                    comments.map(comment => (
                                                        <Comment
                                                            key={ comment.index }
                                                            comment={ comment }
                                                        />
                                                    ))
                                                }
                                            </div>
                                            {
                                                validateFriend && (
                                                    <div style={{ display: 'flex', flexDirection: 'column', marginBlockStart: 30, position: 'relative' }}>
                                                        <input
                                                            type='text'
                                                            className='textfield'
                                                            placeholder='Write a comment...'
                                                            value={ comment }
                                                            onChange={ (e) => setComment(e.target.value) }
                                                        />
                                                        <em
                                                            className='icon-icon-arrow'
                                                            style={{ fontSize: 40, position: 'absolute', right: 5, top: 0, cursor: 'pointer' }}
                                                            onClick={ handleComment }
                                                        ></em>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            showVote && (
                                <ModalCard setError={ setShowVote }>
                                    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ blockSize: 20, textAlign: 'center', marginBlockEnd: 30 }}>
                                            <div className="star-rating" onChange={ (event) => onChangeValue(event) }>
                                                <input className="radio-input" type="radio" id="star5" name="star-input" value="5" />
                                                <label className="radio-label icon-star" htmlFor="star5" title="5 stars">5 stars</label>

                                                <input className="radio-input" type="radio" id="star4" name="star-input" value="4" />
                                                <label className="radio-label icon-star" htmlFor="star4" title="4 stars">4 stars</label>

                                                <input className="radio-input" type="radio" id="star3" name="star-input" value="3" />
                                                <label className="radio-label icon-star" htmlFor="star3" title="3 stars">3 stars</label>

                                                <input className="radio-input" type="radio" id="star2" name="star-input" value="2" />
                                                <label className="radio-label icon-star" htmlFor="star2" title="2 stars">2 stars</label>

                                                <input className="radio-input" type="radio" id="star1" name="star-input" value="1" />
                                                <label className="radio-label icon-star" htmlFor="star1" title="1 star">1 star</label>
                                            </div>
                                        </div>
                                        <button className='button-filled' onClick={ handleSaveVote }>Vote</button>
                                    </div>
                                </ModalCard>
                            )
                        }
                    </>
                )
            }
        </HomeLoginLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id = '' } = query

    const { data: validate } = await agoraApi.get(`/question/validate-complete-questionnaire-by-id?id=${ id }`)

    const email = validate.data.email
    const fullname = validate.data.fullname
    const type = validate.data.type

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