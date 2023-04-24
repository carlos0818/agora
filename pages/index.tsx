import { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { Logout } from '@/components/Home/Logout'
import { Login } from '@/components/Home/Login'
import { FooterDesktop } from '@/components/Footer/FooterDesktop'
import { FooterMobile } from '@/components/Footer/FooterMobile'

import { IUser } from '@/interfaces/user'

interface Props {
  user: IUser
}

const Home: NextPage<Props> = ({ user }) => {

  console.log({ user })

  return (
    <AgoraLayout title='Agora' pageDescription=''>
      <>
        {
          !user
          ? (
            <Logout />
          ) : (
            <Login />
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

  console.log({ session })

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
