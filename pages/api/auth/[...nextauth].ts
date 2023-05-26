import { agoraApi } from '@/api'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET)

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
    async jwt({ token, account, user }) {
      console.log({ token, account, user })
      if (account) {
        token.accesToken = account.access_token

        switch (account.type) {
          case 'oauth':
            const source = account.provider === 'facebook' ? 'FA' : 'GO'
            // const { data } = await agoraApi.post('/user/loginSocial', { email: user.email, fullname: user.name, source, type: 'I',  })
            token.user =  await { fullname: 'Carlos Benavides', email: 'cbenavides0887@gmail.com'  }
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