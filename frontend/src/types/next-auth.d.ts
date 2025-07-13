import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string
      email: string
      access_token?: string
      [key: string]: any
    }
  }

  interface User {
    id: string
    email: string
    access_token?: string
    [key: string]: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    user?: {
      id: string
      email: string
      access_token?: string
      [key: string]: any
    }
  }
}
