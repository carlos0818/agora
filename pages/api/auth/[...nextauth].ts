import { agoraApi } from '@/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import FacebookProvider from "next-auth/providers/facebook"
import Credentials from 'next-auth/providers/credentials'

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'cbeanvides' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
        captcha: {}
      },
      async authorize(credentials): Promise<any> {
        // console.log({credentials})

        try {
          const { data } = await agoraApi.post('/user/login', { email: credentials!.email, password: credentials!.password })
          // console.log(data)
          return data
        } catch (error) {
          console.log(error)
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
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
    async jwt({ token, account, user }) {
    //   console.log({ token, account, user })
      if (account) {
        token.accesToken = account.access_token

        switch (account.type) {
          case 'oauth':
            token.user = await { firstname: 'Carlos', lastname: 'Benavides', email: 'cbenavides0887@gmail.com' }
            break
          case 'credentials':
            token.user = user
            break
        }
      }

      return token
    },
    async session({ session, token, user }) {
    //   console.log({ session, token, user })

      session.accessToken = token.accessToken as any
      session.user = token.user as any

      return session
    }
  }
}

export default NextAuth(authOptions)