import NextAuth, { NextAuthOptions } from 'next-auth'

import { PrismaAdpter } from '../../../lib/auth/prisma-adapater'

import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'


export function buildNextAuthOptions(
    req: NextApiRequest | NextPageContext['req'],
    res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
    return {
        adapter: PrismaAdpter(req, res),
        // Configure one or more authentication providers
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                authorization: {
                    params: {
                        prompt: 'consent',
                        access_type: 'offline',
                        response_type: 'code',
                        scope:
                            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
                    },
                },
                profile(profile: GoogleProfile) {
                    // tudo oq vou acessar do google
                    return {
                        id: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        avatar_url: profile.picture,
                        username: '',
                    }
                },
            }),
            // ...add more providers here
        ],
        callbacks: {
            async signIn({ account }) {

                if (
                    !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
                ) {
                    return '/register/connect-calendar/?error=permissions'
                }

                return true
            },
            async session({ session, user }) {

                return {
                    ...session,
                    user,
                }
            },
        },
    }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
