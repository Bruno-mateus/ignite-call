import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next/types'
import { destroyCookie, parseCookies } from 'nookies'

export function PrismaAdpter(
  req: NextApiRequest| NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userID': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('user ID not found on cookies')
      }
      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        avatar_url: prismaUser.avatar_url!,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_accountId: {
            provider,
            provider_accountId: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) return null

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url!,
        username: user.username,
        email: user.email!,
        emailVerified: null,
      }
    },
    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name,
          avatar_url: user.avatar_url!,
          email: user.email,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        avatar_url: prismaUser.avatar_url!,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
      }
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          provider: account.provider,
          provider_accountId: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          scope: account.scope,
          session_state: account.session_state,
          user_id: account.userId,
        },
      })
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          session_token: sessionToken,
          expires,
        },
      })
      return {
        expires,
        sessionToken,
        userId,
      }
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!prismaSession) return null

      const { ...session } = prismaSession

      return {
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
        user: {
          id: session.user.id,
          name: session.user.name,
          avatar_url: session.user.avatar_url!,
          username: session.user.username,
          email: session.user.email!,
          emailVerified: null,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const session = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        sessionToken: session.session_token,
        expires: session.expires,
        userId: session.user_id,
      }
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
