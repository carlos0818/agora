import styles from './search.module.css'

export const Search = () => {
    return (
        <div className={ styles['search-container'] }>
            <input type='text' className='field' style={{ paddingBlock: 8 }} placeholder='Search your entrepreneur...' />
            <div className={ styles['search-containers'] }>
                <div className={ styles['container-one'] }>
                    <div className={ styles['form-row'] }>
                        <label>Country</label>
                        <select className={ `select ${ styles['select'] }` }>
                            <option value="">Holaaaaaaaaaa</option>
                        </select>
                    </div>
                    <div className={ styles['form-row'] }>
                        <label className={ styles['form-row-label'] }>Funding</label>
                        <div className={ styles['max-min-container'] }>
                            <div className={ styles['max-min-wrapper'] }>
                                <label>Min.</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } style={{ paddingBlock: 8 }} />
                            </div>
                            <div className={ styles['max-min-wrapper'] }>
                                <label>Max.</label>
                                <input type='text' className={ `field ${ styles['textfield'] }` } style={{ paddingBlock: 8 }} />
                            </div>
                        </div>
                    </div>
                    <div className={ styles['form-row'] }>
                        <label className={ styles['form-row-label'] }>Type</label>
                        <select className={ `select ${ styles['select'] }` }>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className={ styles['container-two'] }>
                    <label className='checkbox'>
                        <input
                            type='checkbox'
                            id='checkbox'
                        /> Alphabetical
                        <span className={ `check ${ styles['check'] }` }></span>
                    </label>
                    <label className='checkbox'>
                        <input
                            type='checkbox'
                            id='checkbox'
                        /> Funding
                        <span className={ `check ${ styles['check'] }` }></span>
                    </label>
                    <label className='checkbox'>
                        <input
                            type='checkbox'
                            id='checkbox'
                        /> All matching
                        <span className={ `check ${ styles['check'] }` }></span>
                    </label>
                </div>
            </div>
        </div>
    )
}
