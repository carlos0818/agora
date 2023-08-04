import { NextPage } from 'next'
import Image from 'next/image'

import { useContacts } from '@/hooks/useContacts'
import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './my-contacts.module.css'
import { Fragment } from 'react'

const ContactsPage: NextPage = () => {
    const { windowRef, termRef, contacts, loading, handleSearch } = useContacts()

    return (
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
                    <div className={ `contacts-container ${ styles['contacts-container'] }` } style={{ display: loading ? 'flex' : 'grid', justifyContent: loading ? 'center' : 'flex-start' }}>
                        {
                            loading
                            ? <em className='spinner blue-agora' style={{ blockSize: 40, inlineSize: 40 }} />
                            : contacts.length === 0
                            ? <></>
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
                                                    />
                                                    <Image
                                                        src='/images/mail.svg'
                                                        alt=''
                                                        width={ 24 }
                                                        height={ 24 }
                                                        className={ `icon ${ styles['icon'] }` }
                                                        title='Send message'
                                                    />
                                                    <Image
                                                        src='/images/profile.svg'
                                                        alt=''
                                                        width={ 24 }
                                                        height={ 24 }
                                                        className={ `icon ${ styles['icon'] }` }
                                                        title='View profile'
                                                    />
                                                    <Image
                                                        src='/images/delete.svg'
                                                        alt=''
                                                        width={ 24 }
                                                        height={ 24 }
                                                        className={ `icon ${ styles['icon'] }` }
                                                        title='Delete contact'
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
    )
}

export default ContactsPage