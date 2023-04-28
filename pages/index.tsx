import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { LogoutHome } from '@/components/Home/LogoutHome'
import { LoginHome } from '@/components/Home/LoginHome'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'
import { FooterMobile } from '@/components/Footer/FooterMobile'

import { IUser } from '@/interfaces'

interface Props {
  user: IUser
}

const Home: NextPage<Props> = ({ user }) => {
  return (
    <AgoraLayout title='Agora' pageDescription=''>
      <>
        {
          !user
          ? (
            <LogoutHome />
          ) : (
            <LoginHome />
          )
        }

        <FooterMobile />
        <FooterDesktop />
      </>
    </AgoraLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      props: {
        user: session.user
      }
    }
  }

  return {
    props: {}
  }
}

export default Home
