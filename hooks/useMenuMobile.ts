import { useLayoutEffect, useState } from 'react'

// type HideMenu = 'original' | 'hide' | 'show'

export const useMenuMobile = () => {
    const [hideMenu, setHideMenu] = useState(false)

    useLayoutEffect(() => {
        window.addEventListener('resize', validateScreen)

        return () => {
            window.removeEventListener('resize', validateScreen)
        }
    }, [])

    const validateScreen = () => {
        // if (window.screen.width >= 1024) {
        //     wrapperRef.current!.style.gridTemplateColumns = '236px 1fr 70px'
        //     wrapperRef.current!.style.gap = '36px'
        // } else {
        //     wrapperRef.current!.style.gridTemplateColumns = '1fr'
        //     wrapperRef.current!.style.gap = '0'
        // }

        // paddingWrapper()

        // menuHideRef.current!.style.display = 'none'

        if (window.screen.width >= 1024 && hideMenu) {
            setHideMenu(false)
        }
    }
}