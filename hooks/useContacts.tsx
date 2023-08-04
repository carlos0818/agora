import { useContext, useEffect, useRef, useState } from 'react'

import { MenuContext } from '@/context/menu'
import { AuthContext } from '@/context/auth'
import { agoraApi } from '@/api'
import { IContact } from '@/interfaces'

export const useContacts = () => {
    const { user } = useContext(AuthContext)
    const { isOpenDesktop } = useContext(MenuContext)

    const windowRef = useRef<HTMLInputElement>(null)
    const termRef = useRef<HTMLInputElement>(null)

    const [contacts, setContacts] = useState<IContact[]>([])
    const [loading, setLoading] = useState(false)

    let searchTimeout: any

    useEffect(() => {
        if (contacts.length > 0)
            validateScreen()
    }, [contacts])

    useEffect(() => {
        if (user) {
            getContacts()
        }
    }, [user])

    useEffect(() => {
        validateScreen()
    }, [isOpenDesktop])

    useEffect(() => {
        if (contacts.length > 0) {
            window.addEventListener('resize', validateScreen)
        
            return () => {
                window.removeEventListener('resize', validateScreen)
            }
        }
    }, [user])

    const getContacts = async(term: string | null = null) => {
        setLoading(true)
        let data = ''
        if (term) {
            data = `&term=${ term }`
        }

        try {
            const { data: contacts } = await agoraApi.get<IContact[]>(`/contact/get-contacts-by-email?email=${ user?.email }${ data }`)
            setContacts(contacts)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

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
            const $manager = document.querySelectorAll('.manager') as NodeListOf<HTMLDivElement>

            if (windowRef.current.offsetWidth >= 860) {
                $contactsContainer.style.gridTemplateColumns = '70px 1fr 110px 200px 135px'
                for (let i=0; i<$title.length; i++) {
                    $title[i].style.fontSize = '15px'
                }
                for (let i=0; i<$titleHide.length; i++) {
                    $titleHide[i].style.display = 'block'
                }
                for (let i=0; i<$middleColumn.length; i++) {
                    $middleColumn[i].style.fontSize = '15px'
                    $middleColumn[i].style.paddingBlock = '6px'
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
                for (let i=0; i<$manager.length; i++) {
                    if ($manager[i].textContent!.length > 25) {
                        $manager[i].textContent = $manager[i].textContent!.substring(0, 25) + '...'
                    }
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
                    $middleColumn[i].style.paddingBlock = '4px'
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

    const handleSearch = () => {
        clearTimeout(searchTimeout)

        searchTimeout = setTimeout(async() => {
            getContacts(termRef.current!.value)
        }, 600)
    }

    return {
        windowRef,
        termRef,
        contacts,
        loading,
        handleSearch,
    }
}