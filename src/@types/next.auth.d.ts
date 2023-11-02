// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    avatar_url: string
  }

  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User
  }
}
