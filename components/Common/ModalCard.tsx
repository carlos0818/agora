import { FC, Dispatch, SetStateAction } from 'react'

interface Props {
    headerTitle?: string
    children: JSX.Element
    setError: Dispatch<SetStateAction<boolean>> 
}

export const ModalCard: FC<Props> = ({ children, headerTitle, setError }) => {
    return (
        <div className='locked-background'>
            <div className={ `window-glass window-glass-card` }>
                <div className={ `window-glass-content` } style={{ padding: 16 }}>
                    <div className='popup-header' style={{ marginBlockEnd: 4 }}>
                        <p>{ headerTitle }</p>
                        <span className='popup-close' onClick={ () => setError(false) }>✕</span>
                    </div>
                    { children }
                </div>
            </div>
        </div>
    )
}
