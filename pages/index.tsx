import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { AgoraLayout } from '@/components/layouts/AgoraLayout'
import { LogoutHome } from '@/components/Home/LogoutHome/LogoutHome'
import { LoginHome } from '@/components/Home/LoginHome/LoginHome'

import { IUser } from '@/interfaces'

interface Props {
  user: IUser
}

const Home: NextPage<Props> = ({ user }) => {
  return (
    <>
      {
        !user
        ? (
          <AgoraLayout title='Agora' pageDescription='' home={ user ? false : true }>
            <LogoutHome />
          </AgoraLayout>
        ) : (
          <LoginHome />
        )
      }
    </>
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
