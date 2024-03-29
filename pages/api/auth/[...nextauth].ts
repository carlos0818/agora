import { agoraApi } from '@/api'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

const NextAuth2 = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      Credentials({
        name: 'Custom Login',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'cbeanvides' },
          password: { label: 'Password', type: 'password', placeholder: 'Password' },
          captcha: {},
          loginToken: {},
          token: {}
        },
        async authorize(credentials): Promise<any> {
          // console.log({credentials})

          let sendData: any = {
            email: credentials!.email,
            password: credentials!.password
          }

          if (credentials!.captcha) {
            sendData = {
              ...sendData,
              captcha: credentials!.captcha
            }
          }
  
          try {
            if (credentials?.loginToken === 'Y') {
              const { data } = await agoraApi.post('/user/login-token', { email: credentials.email, token: credentials.token })
              return data
            } else {
              const { data } = await agoraApi.post('/user/login', sendData)
              return data
            }
          } catch (error: any) {
            // console.log(error.response.data)
          }
        },
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
  //   secret: process.env.NEXTAUTH_SECRET,
    // custom pages
    pages: {
      signIn: '/login',
      newUser: '/signup'
    },
    session: {
      maxAge: 2592000,
      strategy: 'jwt',
      updateAge: 86400,
    },
    callbacks: {
      async jwt({ token, account, user, trigger, session }) {
        // console.log({ token, account, user })

        if (trigger === 'update') {
          token.user = session.user
        }

        if (account) {
          token.accesToken = account.access_token
  
          switch (account.type) {
            case 'oauth':
              const source = account.provider === 'facebook' ? 'FA' : 'GO'

              if(req.cookies.additionalAuthParams) {
                const { accountType, login } = JSON.parse(req.cookies.additionalAuthParams)

                if(login === 'Y') {
                  const { data } = await agoraApi.post('/user/user-exists', { email: user.email, fullname: user.name, source, type: accountType })
                  token.user = data
                } else {
                  const { data } = await agoraApi.post('/user/login-social', { email: user.email, fullname: user.name, source, type: accountType })
                  token.user = data
                }
              }
              break
            case 'credentials':
              token.user = user
              break
          }
        }

        return token
      },
      async session({ session, token, user }) {
        // console.log({ session, token, user })
  
        session.accessToken = token.accessToken as any
        session.user = token.user as any
  
        return session
      }
    }
  })
}

export default NextAuth2
