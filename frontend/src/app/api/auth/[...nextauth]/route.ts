
import { API_BASE_URL } from '@/utils/constants'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Senha', type: 'password' }
      },
     async authorize(credentials) {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Credenciais inválidas')
      }

      return {
        ...data.user,
        access_token: data.access_token
      }
}
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
       session.user = token.user ?? { id: '', email: '', access_token: undefined };
      session.accessToken = token.accessToken
      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
