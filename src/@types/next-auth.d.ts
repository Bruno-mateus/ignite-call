// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    username: string
    email: string
    name: string
    avatar_url: string
  }
}
