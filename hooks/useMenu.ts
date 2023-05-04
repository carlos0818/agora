import { RefObject, useLayoutEffect, useRef, useState } from 'react'

type HideMenu = 'original' | 'hide' | 'show'

export const useMenu = (wrapperRef: RefObject<HTMLInputElement>) => {
    const [hideMenu, setHideMenu] = useState<HideMenu>('original')
    const menuHideRef = useRef<HTMLInputElement>(null)

    useLayoutEffect(() => {
        window.addEventListener('resize', validateScreen)

        return () => {
            window.removeEventListener('resize', validateScreen)
        }
    }, [])

    const paddingWrapper = () => {
        if (window.screen.width < 768) {
            wrapperRef.current!.style.paddingInline = '14px'
        } else if (window.screen.width < 1024) {
            wrapperRef.current!.style.paddingInline = '20px'
        } else if (window.screen.width < 1370) {
            wrapperRef.current!.style.paddingInline = '40px'
        } else {
            wrapperRef.current!.style.paddingInline = '20px'
        }
    }

    const validateScreen = () => {
        if (window.screen.width >= 1024) {
            wrapperRef.current!.style.gridTemplateColumns = '236px 1fr 70px'
            wrapperRef.current!.style.gap = '36px'
        } else {
            wrapperRef.current!.style.gridTemplateColumns = '1fr'
            wrapperRef.current!.style.gap = '0'
        }

        paddingWrapper()

        menuHideRef.current!.style.display = 'none'

        if (window.screen.width >= 1024 && hideMenu === 'original') {
            setHideMenu('original')
        }
    }

    const handleToggleMenu = () => {
        if(hideMenu === 'hide') {
            setHideMenu('show')
            setTimeout(() => {
                wrapperRef.current!.style.gridTemplateColumns = '236px 1fr 70px'
                wrapperRef.current!.style.gap = '36px'
                menuHideRef.current!.style.display = 'none'

                paddingWrapper()
            }, 300)
        } else {
            setHideMenu('hide')
            setTimeout(() => {
                wrapperRef.current!.style.gridTemplateColumns = '1fr'
                wrapperRef.current!.style.gap = '0'
                menuHideRef.current!.style.display = 'flex'

                paddingWrapper()
            }, 300)
        }
    }

    return {
        hideMenu,
        menuHideRef,
        handleToggleMenu
    }
}