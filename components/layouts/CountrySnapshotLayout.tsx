import { FC } from 'react'
import Head from 'next/head'

interface Props {
    children: JSX.Element
}

export const CountrySnapshotLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                
            </Head>
            { children }
        </>
    )
}
