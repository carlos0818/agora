import { useContext } from 'react'
import Image from 'next/image'

import { AuthContext } from '@/context/auth'

import styles from './write-message.module.css'

export const WriteMessage = () => {
    // const { user } = useContext(AuthContext)

    return (
        <div className={ styles['write-container'] }>
            <div className={ styles['search-contact-container'] }>
                <input
                    // ref={ termRef }
                    type='text'
                    className='field'
                    style={{ paddingBlock: 8, inlineSize: '100%' }}
                    placeholder='Contact name'
                    // onChange={ handleSearch }
                />
                <Image
                    src='/images/user-photo.jpeg'
                    alt=''
                    width={ 80 }
                    height={ 80 }
                    className={ styles['contact-pic'] }
                />

            </div>
            <input
                // ref={ termRef }
                type='text'
                className='field'
                style={{ paddingBlock: 8 }}
                placeholder='Subject'
                // onChange={ handleSearch }
            />
            <div className={ styles['checkboxes-container'] }>
                <label className='checkbox'>
                    <input
                        // ref={ alphabeticalRef }
                        type='checkbox'
                        // onChange={ handleSearch }
                        value='I'
                    /> Important
                    <span className='check-white'></span>
                </label>
                <label className='checkbox'>
                    <input
                        // ref={ alphabeticalRef }
                        type='checkbox'
                        // onChange={ handleSearch }
                        value='A'
                    /> Attach my Pitch Deck
                    <span className='check-white'></span>
                </label>
            </div>
            <textarea className={ `field ${ styles['text-message'] } ` } />
            <a className={ styles['send-button'] }>SEND MESSAGE</a>
        </div>
    )
}
