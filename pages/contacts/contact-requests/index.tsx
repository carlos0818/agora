import { Fragment, useContext, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { useContacts } from '@/hooks/useContacts'
import { IContact } from '@/interfaces'
import { agoraApi } from '@/api'
import { AuthContext } from '@/context/auth'

import countriesList from '@/db/countries'
import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'
import { ModalCard } from '@/components/Common/ModalCard'
import { Modal } from '@/components/Common/Modal'

import styles from '../my-contacts/my-contacts.module.css'

const ContactRequests: NextPage = () => {
    const { user } = useContext(AuthContext)

    const { countries } = countriesList

    const { windowRef, termRef, contacts, loading, setContacts, handleSearch } = useContacts('CR')

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [userDelete, setUserDelete] = useState<IContact | null>(null)
    const [contactInfo, setContactInfo] = useState<IContact | null>(null)

    const handleCopy = async(type: string) => {
        let copyText = document.getElementById("emailText")?.innerHTML

        if (type === 'phone') {
            copyText = document.getElementById("phoneText")?.innerHTML
        }
      
        try {
            await navigator.clipboard.writeText(copyText!)
        } catch (err) {

        }
    }

    const handleDelete = async(id: string) => {
        await agoraApi.post(`/contact/delete-contact`, { id, email: user?.email })

        const filter = contacts.filter(contact => contact.id !== id)
        setContacts(filter)

        setConfirmDelete(false)
    }

    const handleAccept = async(id: string) => {
        await agoraApi.post(`/contact/accept-contact`, { id, email: user?.email })

        const filter = contacts.filter(contact => contact.id !== id)
        setContacts(filter)

        setConfirmDelete(false)
    }

    return (
        <>
            <HomeLoginLayout
                title=''
                pageDescription=''
            >
                <div className={ `window-glass` } ref={ windowRef }>
                    <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                        <div className={ styles['search-container'] }>
                            <input
                                ref={ termRef }
                                type='text'
                                className='field'
                                style={{ paddingBlock: 8 }}
                                placeholder='Search your contact by Name...'
                                onChange={ handleSearch }
                            />
                        </div>
                        <div className={ `contacts-container ${ styles['contacts-container'] }` } style={{ display: (loading || contacts.length === 0) ? 'flex' : 'grid', justifyContent: (loading || contacts.length === 0) ? 'center' : 'flex-start' }}>
                            {
                                loading
                                ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                                : contacts.length === 0
                                ? <p style={{ margin: 'auto' }}>No results</p>
                                : (
                                    <>
                                        <p></p>
                                        <p className={ `title ${ styles['title'] }` }>Name</p>
                                        <p className={ `title-hide title ${ styles['title'] }` }>Type</p>
                                        <p className={ `title-hide title ${ styles['title'] }` }>Manager</p>
                                        <p></p>
                                        {
                                            contacts.map(contact => (
                                                <Fragment key={ contact.id }>
                                                    <div className={ styles['first-column'] }>
                                                        <div className={ `user-circle ${ styles['user-circle'] }` }>
                                                            {
                                                                contact.profilepic && (
                                                                    <Image
                                                                        src={ contact.profilepic }
                                                                        alt=''
                                                                        width={ 60 }
                                                                        height={ 60 }
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className={ `company-name middle-column ${ styles['middle-column'] }` }>{ contact.companyName }</p>
                                                    <p className={ `middle-column-hide middle-column ${ styles['middle-column'] }` }>{ contact.type }</p>
                                                    <p className={ `manager middle-column-hide middle-column ${ styles['middle-column'] }` }>{ contact.fullname }</p>
                                                    <div className={ `last-column ${ styles['last-column'] }` }>
                                                        <Image
                                                            src='/images/info.svg'
                                                            alt=''
                                                            width={ 24 }
                                                            height={ 24 }
                                                            className={ `icon ${ styles['icon'] }` }
                                                            title='View details'
                                                            onClick={ () => {
                                                                setContactInfo(contact)
                                                                setShowInfo(true)
                                                            }}
                                                        />
                                                        <Link
                                                            href={ `/profile/${ contact.id }` }
                                                            passHref
                                                            prefetch={ false }
                                                            legacyBehavior
                                                        >
                                                            <Image
                                                                src='/images/profile.svg'
                                                                alt=''
                                                                width={ 24 }
                                                                height={ 24 }
                                                                className={ `icon ${ styles['icon'] }` }
                                                                title='View profile'
                                                            />
                                                        </Link>
                                                        <Image
                                                            src='/images/check.svg'
                                                            alt=''
                                                            width={ 24 }
                                                            height={ 24 }
                                                            className={ `icon ${ styles['icon'] }` }
                                                            title='Send message'
                                                            onClick={ () => handleAccept(contact.id) }
                                                        />
                                                        <Image
                                                            src='/images/delete.svg'
                                                            alt=''
                                                            width={ 24 }
                                                            height={ 24 }
                                                            className={ `icon ${ styles['icon'] }` }
                                                            title='Delete contact'
                                                            onClick={ () => {
                                                                setConfirmDelete(true)
                                                                setUserDelete(contact)
                                                            }}
                                                        />
                                                    </div>
                                                </Fragment>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </HomeLoginLayout>
            {
                confirmDelete && (
                    <Modal setError={ setConfirmDelete }>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>Are you sure you want to delete { userDelete?.fullname } from your contacts?</p>
                            <div style={{ display: 'flex', gap: 16, marginBlockStart: 20, textAlign: 'end' }}>
                                <button
                                    className='button-filled'
                                    onClick={ () => handleDelete(userDelete!.id) }
                                >Delete</button>
                                <button
                                    className='button-filled'
                                    onClick={ () => {
                                        setUserDelete(null)
                                        setConfirmDelete(false)
                                    }}
                                >Cancel</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
            {
                showInfo && (
                    <ModalCard setError={ setShowInfo }>
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <p style={{ color: '#10284F', fontFamily: 'ebrima-bold', fontSize: 26 }}>{ contactInfo?.companyName }</p>
                            <p style={{ color: '#10284F', fontFamily: 'ebrima', fontSize: 18 }}>By { contactInfo?.fullname }</p>
                            <p style={{ color: 'rgba(16, 40, 79, 0.7)', fontFamily: 'ebrima', fontSize: 12 }}>Member 2 months ago</p>
                            <div style={{ blockSize: 20, inlineSize: 150, textAlign: 'center' }}>
                                <i className='icon-star' data-star="3.5" style={{ fontSize: 20 }}></i>
                            </div>
                            <p style={{ color: '#10284F', fontFamily: 'ebrima', fontSize: 16 }}>
                                {
                                    `
                                    ${ contactInfo?.city } - 
                                    ${ countries.find(c => c.alpha3 === contactInfo?.country && contactInfo?.country !== '')?.name }
                                    `
                                }
                            </p>
                            <p style={{ color: '#10284F', fontFamily: 'ebrima', fontSize: 16 }}>{ contactInfo?.address }</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <p id='emailText' style={{ color: '#10284F', fontFamily: 'ebrima', fontSize: 16 }}>{ contactInfo?.email }</p>
                                <Image
                                    src='/images/copy.svg'
                                    alt=''
                                    width={ 25 }
                                    height={ 25 }
                                    style={{ cursor: 'pointer' }}
                                    title='Copy to clipboard'
                                    onClick={ () => handleCopy('email') }
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <p id='phoneText' style={{ color: '#10284F', fontFamily: 'ebrima', fontSize: 16 }}>{ contactInfo?.phone }</p>
                                <Image
                                    src='/images/copy.svg'
                                    alt=''
                                    width={ 25 }
                                    height={ 25 }
                                    style={{ cursor: 'pointer' }}
                                    title='Copy to clipboard'
                                    onClick={ () => handleCopy('phone') }
                                />
                            </div>
                        </div>
                    </ModalCard>
                )
            }
        </>
    )
}

export default ContactRequests