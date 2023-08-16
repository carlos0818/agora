import { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { agoraApi } from '@/api'
import { IContact } from '@/interfaces'
import { AuthContext } from '@/context/auth'

import styles from './write-message.module.css'

interface Props {
    contacts: IContact[]
    contactId?: string
    selectedContact: IContact | null
    sendMessage?: any
    setSelectedContact: Dispatch<SetStateAction<IContact | null>>
}

export const WriteMessage: FC<Props> = ({ contacts, contactId = '', sendMessage, selectedContact, setSelectedContact }) => {
    const { user } = useContext(AuthContext)

    const searchRef = useRef<HTMLInputElement>(null)
    const subjectRef = useRef<HTMLInputElement>(null)
    const importantRef = useRef<HTMLInputElement>(null)
    const attachRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const [autocomplete, setAutocomplete] = useState(false)
    const [contactsFilter, setContactsFilter] = useState<IContact[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (contacts.length > 0) {
            if (contactId !== '') {
                const find = contacts.find(contact => contact.id === contactId)
                if (find) {
                    setSelectedContact(find)
                    searchRef.current!.value = find.companyName
                }
            }
        }
    }, [contacts])

    useEffect(() => {
        if (sendMessage) {
            searchRef.current!.value = selectedContact?.companyName! ? selectedContact?.companyName! : ''
            subjectRef.current!.value = sendMessage.subject
            bodyRef.current!.value = sendMessage.body
            importantRef.current!.checked = sendMessage.important === 1 ? true : false
            attachRef.current!.checked = sendMessage.pitch === 1 ? true : false
        }
    }, [sendMessage])

    const handleAutocomplete = () => {
        const filter = contacts.filter(contact => contact.companyName.toLowerCase().includes(searchRef.current!.value.toLowerCase()) && searchRef.current!.value.length > 0)
        if (filter.length > 0) {
            setContactsFilter(filter)
            setAutocomplete(true)
        } else {
            setContactsFilter([])
            setAutocomplete(false)
        }
    }

    const handleSelectContact = (contact: IContact) => {
        setSelectedContact(contact)
        setAutocomplete(false)
        searchRef.current!.value = contact.companyName
    }

    const handleSendMessage = async() => {
        if (!selectedContact || subjectRef.current!.value === '' || bodyRef.current!.value === '') {
            return
        }

        setLoading(true)

        const data = {
            email: selectedContact?.email,
            emailcontact: user?.email,
            status: 'S',
            subject: subjectRef.current!.value,
            body: bodyRef.current!.value,
            important: importantRef.current!.checked ? '1' : '0',
            pitch: attachRef.current!.checked ? '1' : '0',
        }

        try {
            await agoraApi.post('/message/send-message', data)

            searchRef.current!.value = ''
            subjectRef.current!.value = ''
            importantRef.current!.checked = false
            attachRef.current!.checked = false
            bodyRef.current!.value = ''

            setAutocomplete(false)
            setSelectedContact(null)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={ styles['write-container'] }>
            <div className={ styles['search-contact-container'] }>
                <div className={ styles['search-input-container'] }>
                    <input
                        ref={ searchRef }
                        type='text'
                        className='field'
                        style={{ paddingBlock: 8, inlineSize: '100%' }}
                        placeholder='Contact name'
                        onChange={ handleAutocomplete }
                    />
                    {
                        autocomplete && (
                            <ul className={ styles['autocomplete'] }>
                                {
                                    contactsFilter.map(contact => (
                                        <li
                                            key={ contact.email }
                                            onClick={ () => handleSelectContact(contact) }
                                        >
                                            { contact.companyName }
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
                <div className={ styles['image-name-container'] } style={{ display: selectedContact?.profilepic ? 'flex' : 'none' }}>
                    {
                        selectedContact?.profilepic && (
                            <>
                                <Image
                                    src={ selectedContact.profilepic }
                                    alt=''
                                    width={ 80 }
                                    height={ 80 }
                                    className={ styles['contact-pic'] }
                                />
                                <span>{ selectedContact?.fullname }</span>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={ styles['subject-checkboxes-container'] }>
                <input
                    ref={ subjectRef }
                    type='text'
                    className='field'
                    style={{ paddingBlock: 8 }}
                    placeholder='Subject'
                />
                <div className={ styles['checkboxes-container'] }>
                    <label className='checkbox'>
                        <input
                            ref={ importantRef }
                            type='checkbox'
                            value='1'
                        /> Important
                        <span className='check-white'></span>
                    </label>
                    <label className='checkbox'>
                        <input
                            ref={ attachRef }
                            type='checkbox'
                            value='1'
                        /> Attach my Pitch Deck
                        <span className='check-white'></span>
                    </label>
                </div>
            </div>
            <textarea
                ref={ bodyRef }
                className={ `field ${ styles['text-message'] } ` }
                placeholder='Write a message...'
            />
            {
                loading ? (
                    <em className='spinner white' style={{ alignSelf: 'flex-end', blockSize: 36, inlineSize: 36, marginInlineEnd: 10 }} />
                ) : (
                    <a className={ styles['send-button'] } onClick={ handleSendMessage }>SEND MESSAGE</a>
                )
            }
        </div>
    )
}
