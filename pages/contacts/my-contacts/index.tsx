import { useContext, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'

import { HomeLoginLayout } from '@/components/layouts/HomeLoginLayout'

import styles from './my-contacts.module.css'
import { MenuContext } from '@/context/menu'

const ContactsPage: NextPage = () => {
    const { isOpenDesktop } = useContext(MenuContext)

    const windowRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        validateScreen()
    }, [])

    useEffect(() => {
        validateScreen()
    }, [isOpenDesktop])

    useEffect(() => {
        console.log('entró')
        window.addEventListener('resize', validateScreen)

        return () => {
            window.removeEventListener('resize', validateScreen)
        }
    }, [windowRef])

    const validateScreen = () => {
        if (windowRef.current) {
            const $contactsContainer = document.querySelector('.contacts-container') as HTMLInputElement
            const $title = document.querySelectorAll('.title') as NodeListOf<HTMLInputElement>
            const $titleHide = document.querySelectorAll('.title-hide') as NodeListOf<HTMLInputElement>
            const $middleColumn = document.querySelectorAll('.middle-column') as NodeListOf<HTMLInputElement>
            const $middleColumnHide = document.querySelectorAll('.middle-column-hide') as NodeListOf<HTMLInputElement>
            const $lastColumn = document.querySelectorAll('.last-column') as NodeListOf<HTMLInputElement>
            const $icon = document.querySelectorAll('.icon') as NodeListOf<HTMLInputElement>
            const $companyName = document.querySelectorAll('.company-name') as NodeListOf<HTMLParagraphElement>
            const $userCircle = document.querySelectorAll('.user-circle') as NodeListOf<HTMLDivElement>

            if (windowRef.current.offsetWidth >= 860) {
                $contactsContainer.style.gridTemplateColumns = '70px 1fr 110px 170px 135px'
                for (let i=0; i<$title.length; i++) {
                    $title[i].style.fontSize = '15px'
                }
                for (let i=0; i<$titleHide.length; i++) {
                    $titleHide[i].style.display = 'block'
                }
                for (let i=0; i<$middleColumn.length; i++) {
                    $middleColumn[i].style.fontSize = '15px'
                    $middleColumn[i].style.padding = '6px'
                }
                for (let i=0; i<$middleColumnHide.length; i++) {
                    $middleColumnHide[i].style.display = 'block'
                }
                for (let i=0; i<$lastColumn.length; i++) {
                    $lastColumn[i].style.inlineSize = '135px'
                }
                for (let i=0; i<$icon.length; i++) {
                    $icon[i].style.blockSize = '24px'
                    $icon[i].style.inlineSize = '24px'
                }
                for (let i=0; i<$userCircle.length; i++) {
                    $userCircle[i].style.blockSize = '60px'
                    $userCircle[i].style.inlineSize = '60px'
                    $userCircle[i].style.top = '-12px'
                }
            } else {
                $contactsContainer.style.gridTemplateColumns = '50px 1fr 100px'
                for (let i=0; i<$title.length; i++) {
                    $title[i].style.fontSize = '13px'
                }
                for (let i=0; i<$titleHide.length; i++) {
                    $titleHide[i].style.display = 'none'
                }
                for (let i=0; i<$middleColumn.length; i++) {
                    $middleColumn[i].style.fontSize = '13px'
                    $middleColumn[i].style.padding = '4px'
                }
                for (let i=0; i<$middleColumnHide.length; i++) {
                    $middleColumnHide[i].style.display = 'none'
                }
                for (let i=0; i<$lastColumn.length; i++) {
                    $lastColumn[i].style.inlineSize = '100px'
                }
                for (let i=0; i<$icon.length; i++) {
                    $icon[i].style.blockSize = '17px'
                    $icon[i].style.inlineSize = '17px'
                }
                for (let i=0; i<$userCircle.length; i++) {
                    $userCircle[i].style.blockSize = '43px'
                    $userCircle[i].style.inlineSize = '43px'
                    $userCircle[i].style.top = '-8px'
                }
            }

            if (windowRef.current.offsetWidth < 500) {
                for (let i=0; i<$companyName.length; i++) {
                    if ($companyName[i].textContent!.length > 25) {
                        $companyName[i].textContent = $companyName[i].textContent!.substring(0, 25) + '...'
                    }
                }
            }

            if (windowRef.current.offsetWidth < 420) {
                for (let i=0; i<$companyName.length; i++) {
                    if ($companyName[i].textContent!.length > 15) {
                        $companyName[i].textContent = $companyName[i].textContent!.substring(0, 15) + '...'
                    }
                }
            }
        }
    }

    return (
        <HomeLoginLayout
            title=''
            pageDescription=''
        >
            <div className={ `window-glass` } ref={ windowRef }>
                <div className={ `window-glass-content` } style={{ padding: 0, overflow: 'hidden' }}>
                    <div className={ styles['search-container'] }>
                        <input
                            // ref={ termRef }
                            type='text'
                            className='field'
                            style={{ paddingBlock: 8 }}
                            placeholder='Search your contact...'
                            // onChange={ handleSearchTextfield }
                        />
                    </div>
                    <div className={ `contacts-container ${ styles['contacts-container'] }` }>
                        <p></p>
                        <p className={ `title ${ styles['title'] }` }>Name</p>
                        <p className={ `title-hide title ${ styles['title'] }` }>Type</p>
                        <p className={ `title-hide title ${ styles['title'] }` }>Manager</p>
                        <p></p>

                        <div className={ styles['first-column'] }>
                            <div className={ `user-circle ${ styles['user-circle'] }` }>
                                {/* <Image
                                    src={  }
                                /> */}
                            </div>
                        </div>
                        <p className={ `company-name middle-column ${ styles['middle-column'] }` }>QuarkLink asdja asdjahd asdjha aoengietd</p>
                        <p className={ `middle-column-hide middle-column ${ styles['middle-column'] }` }>Entrepreneur</p>
                        <p className={ `middle-column-hide middle-column ${ styles['middle-column'] }` }>Carlos Benavides Rod...</p>
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
                        
                    </div>
                </div>
            </div>
        </HomeLoginLayout>
    )
}

export default ContactsPage