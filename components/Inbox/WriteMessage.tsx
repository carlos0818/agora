import Image from 'next/image'

import styles from './write-message.module.css'

export const WriteMessage = () => {
    return (
        <div className={ styles['write-container'] }>
            <div className={ styles['search-contact-container'] }>
                <div className={ styles['search-input-container'] }>
                    <input
                        // ref={ termRef }
                        type='text'
                        className='field'
                        style={{ paddingBlock: 8, inlineSize: '100%' }}
                        placeholder='Contact name'
                        // onChange={ handleSearch }
                    />
                    <ul className={ styles['autocomplete'] }>
                        <li>Ricardo Leuridan</li>
                        <li>Carlos Benavides</li>
                    </ul>
                </div>
                <div className={ styles['image-name-container'] }>
                    <Image
                        src='/images/user-photo.jpeg'
                        alt=''
                        width={ 80 }
                        height={ 80 }
                        className={ styles['contact-pic'] }
                    />
                    <span>Carlos Benavides</span>
                </div>
            </div>
            <div className={ styles['subject-checkboxes-container'] }>
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
            </div>
            <textarea className={ `field ${ styles['text-message'] } ` } />
            <a className={ styles['send-button'] }>SEND MESSAGE</a>
        </div>
    )
}
