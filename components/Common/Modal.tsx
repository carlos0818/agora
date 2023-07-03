import { FC, Dispatch, SetStateAction } from 'react'

interface Props {
    headerTitle?: string
    children: JSX.Element
    setError: Dispatch<SetStateAction<boolean>> 
}

export const Modal: FC<Props> = ({ children, headerTitle, setError }) => {
    return (
        <div className='locked-background'>
            <div className={ `window-glass window-glass-popup` }>
                <div className={ `window-glass-content` }>
                    <div className='popup-header'>
                        <p>{ headerTitle }</p>
                        <span className='popup-close' onClick={ () => setError(false) }>✕</span>
                    </div>
                    { children }
                </div>
            </div>
        </div>
    )
}
