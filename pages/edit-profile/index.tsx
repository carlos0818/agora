import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { HomeLoginWithoutMenuLayout } from '@/components/layouts/HomeLoginWithoutMenuLayout'

import styles from './edit-profile.module.css'
import { useEditProfile } from '@/hooks/useEditProfile'

const EditProfile: NextPage = () => {
    const router = useRouter()

    const {
        user,
        countries,
        fullname,
        profilePic,
        video,
        backgroundPic,
        showUserMessage,
        showPasswordMessage,
        showDataMessage,
        fullnameError,
        fullnameRef,
        register,
        register2,
        errors,
        errors2,
        getValues2,
        onSaveTypeAccountData,
        onFileSelected,
        handleSaveUser,
        handleSubmit,
        handleSubmit2,
        onChangePassword,
    } = useEditProfile()

    return (
        <HomeLoginWithoutMenuLayout
            title=''
            pageDescription=''
        >
            <>
                <div className={ `window-glass ${ styles['window-glass'] }` }>
                    <div className={ `window-glass-content` }>
                        <div className={ styles['group'] }>
                            <h3 className={ styles['title'] }>User information</h3>
                            <div className={ styles['form-group'] }>
                                <label>Username</label>
                                <label>{ user?.email }</label>
                            </div>
                            <div className={ styles['form-group'] }>
                                <label>Full name *</label>
                                <input
                                    ref={ fullnameRef }
                                    type='text'
                                    className={ `field ${ styles['textfield'] } ${ fullnameError ? styles['error'] : '' }` }
                                    defaultValue={ fullname }
                                />
                            </div>
                            <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                <input
                                    type='submit'
                                    value='Save user information'
                                    className={ `button-filled` }
                                    style={{ paddingInline: 20 }}
                                    onClick={ handleSaveUser }
                                />
                            </div>
                            {
                                showUserMessage && (
                                    <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                        <span style={{ color: '#006f0d' }}>Your information has been updated</span>
                                    </div>
                                )
                            }
                        </div>
                        {
                            user?.source === 'PR' && (
                                <>
                                    <hr style={{ borderBlockStart: '1px solid rgba(0,0,0,0.1)', marginBlock: 30 }} />
                                    <form onSubmit={ handleSubmit2(onChangePassword) } noValidate>
                                        <div className={ styles['group'] }>
                                            <h3 className={ styles['title'] }>Change password</h3>
                                            <div className={ styles['form-group'] }>
                                                <label>Current password *</label>
                                                <div>
                                                    <input
                                                        type='password'
                                                        className={ `field ${ styles['textfield'] } ${ errors2.currentPassword ? styles['error'] : '' }` }
                                                        { ...register2('currentPassword', {
                                                            required: 'This field is required',
                                                        })}
                                                    />
                                                    { errors2.currentPassword && <span className={ styles['message-error'] }>{ errors2.currentPassword.message }</span> }
                                                </div>
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>New password *</label>
                                                <div>
                                                    <input
                                                        type='password'
                                                        className={ `field ${ styles['textfield'] } ${ errors2.newPassword ? styles['error'] : '' }` }
                                                        { ...register2('newPassword', {
                                                            required: 'This field is required',
                                                            validate: {
                                                                strong: (v) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/.test(v) || 'The password must have at least 10 characters, Uppercase and lowercase letter, a number, and special character',
                                                                dontMatch: value => value === getValues2('confirmPassword') || 'Passwords don\'t match'
                                                            }
                                                        })}
                                                    />
                                                    { errors2.newPassword && <span className={ styles['message-error'] }>{ errors2.newPassword.message }</span> }
                                                </div>
                                            </div>
                                            <div className={ styles['form-group'] }>
                                                <label>Confirm password *</label>
                                                <div>
                                                    <input
                                                        type='password'
                                                        className={ `field ${ styles['textfield'] } ${ errors2.confirmPassword ? styles['error'] : '' }` }
                                                        { ...register2('confirmPassword', {
                                                            required: 'This field is required',
                                                            validate: {
                                                                dontMatch: value => value === getValues2('newPassword') || 'Passwords don\'t match'
                                                            }
                                                        })}
                                                    />
                                                    { errors2.confirmPassword && <span className={ styles['message-error'] }>{ errors2.confirmPassword.message }</span> }
                                                </div>
                                            </div>
                                            <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                                <input
                                                    type='submit'
                                                    value='Change password'
                                                    className={ `button-filled` }
                                                    style={{ paddingInline: 20 }}
                                                />
                                            </div>
                                            {
                                                showPasswordMessage && (
                                                    <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                                        <span style={{ color: '#006f0d' }}>Your password has been updated</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </form>
                                </>
                            )
                        }
                        <hr style={{ borderBlockStart: '1px solid rgba(0,0,0,0.1)', marginBlock: 30 }} />
                        <form onSubmit={ handleSubmit(onSaveTypeAccountData) } noValidate>
                            <div className={ styles['group'] }>
                                <h3 className={ styles['title'] }>Entrepreneur information</h3>
                                <div className={ styles['form-group'] }>
                                    <label>Company name *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('name', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Profile picture *</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            style={{ blockSize: 34, backgroundColor: errors.profilePicture ? 'red' : '#10284F' }}
                                            value='Upload image'
                                            onClick={ () => document.getElementById('profilePic')!.click() }
                                        />
                                        <input
                                            id='profilePic'
                                            type="file"
                                            accept='image/png, image/jpg, image/jpeg'
                                            style={{ display: 'none' }}
                                            { ...register('profilePicture', {
                                                // required: true,
                                                onChange: (event) => onFileSelected(event, 'profile')
                                            })}
                                        />
                                        <div style={{ inlineSize: 40, blockSize: 40 }}>
                                            {
                                                profilePic && (
                                                    <Image
                                                        src={ profilePic }
                                                        alt=''
                                                        width={ 40 }
                                                        height={ 40 }
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Email contact *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] } ${ errors.emailContact ? styles['error'] : '' }` }
                                        { ...register('emailContact', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Phone *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('phone', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Country *</label>
                                    <select
                                        className={ `field select ${ styles['select'] }` }
                                        style={{ borderRadius: 100 }}
                                        { ...register('country', {
                                            required: true,
                                        })}
                                    >
                                        {
                                            countries.map(country => (
                                                <option key={ country.alpha3 } value={ country.alpha3 }>{ country.name }</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>City *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('city', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Address *</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('address', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Video</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)', position: 'relative' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            value='Upload video'
                                            onClick={ () => document.getElementById('video')!.click() }
                                        />
                                        <input
                                            id='video'
                                            type="file"
                                            accept='video/mp4'
                                            style={{ display: 'none' }}
                                            { ...register('video', {
                                                onChange: (event) => onFileSelected(event, 'video')
                                            }) }
                                        />
                                        <div style={{ position: 'absolute', inlineSize: 80, blockSize: 80, left: 170 }}>
                                            {
                                                video && (
                                                    <video width={ 80 } height={ 80 } autoPlay muted loop>
                                                        <source src={ video } />
                                                    </video>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Company URL</label>
                                    <input
                                        type='text'
                                        className={ `field ${ styles['textfield'] }` }
                                        { ...register('companyUrl') }
                                    />
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Facebook URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.facebook.com/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('facebookUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Linkedin URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.linkedin.com/in/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('linkedinUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Twitter URL</label>
                                    <div className={ styles['social-container'] }>
                                        <label>https://www.twitter.com/</label>
                                        <input
                                            type='text'
                                            className={ `field ${ styles['textfield'] }` }
                                            { ...register('twitterUrl') }
                                        />
                                    </div>
                                </div>
                                <div className={ styles['form-group'] }>
                                    <label>Background picture</label>
                                    <div style={{ alignItems: 'center', display: 'flex', gap: 16, inlineSize: 'calc(100% - 24px)' }}>
                                        <input
                                            type='button'
                                            className={ `button-filled` }
                                            value='Upload image'
                                            onClick={ () => document.getElementById('backgroundPic')!.click() }
                                        />
                                        <input
                                            id='backgroundPic'
                                            type="file"
                                            accept='image/png, image/jpg, image/jpeg'
                                            style={{ display: 'none' }}
                                            { ...register('backgroundPicture', {
                                                onChange: (event) => onFileSelected(event, 'background')
                                            }) }
                                        />
                                        <div style={{ inlineSize: 40, blockSize: 40 }}>
                                            {
                                                backgroundPic && (
                                                    <Image
                                                        src={ backgroundPic }
                                                        alt=''
                                                        width={ 40 }
                                                        height={ 40 }
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                    <input type='submit' value='Save entrepreneur information' className={ `button-filled` } style={{ paddingInline: 20 }} />
                                </div>
                                <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 30 }}>
                                    <input
                                        type='button'
                                        value='Return to my profile'
                                        className={ `button-outline` }
                                        style={{ paddingInline: 20 }}
                                        onClick={ () => router.push(`/profile/${ user?.id }`) }
                                    />
                                </div>
                                {
                                    showDataMessage && (
                                        <div style={{ display: 'inline-block', inlineSize: '100%', textAlign: 'center', marginBlockStart: 16 }}>
                                            <span style={{ color: '#006f0d' }}>Your information has been updated</span>
                                        </div>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </HomeLoginWithoutMenuLayout>
    )
}

export default EditProfile