import NextAuth, { NextAuthOptions } from 'next-auth'
// import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
// import { dbUsers } from '../../../database'

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
        email: { label: 'Email', type: 'email', placeholder: 'email@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
        captcha: {}
      },
      async authorize(credentials): Promise<any> {
        console.log({credentials})

        return await { id: 1, name: 'Carlos', lastname: 'Benavides', email: 'carlos@gmail.com' }

        // return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
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
            // token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '')
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