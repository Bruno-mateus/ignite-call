import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'

import { prisma } from "../../../lib/prisma"

interface IUpdateProfile {
    bio: string
}

export default async function Handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).end()
    }

    const session = await unstable_getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res)
    )

    if (!session) {
        return res.status(401).end()

    }
    const { bio } = req.body as IUpdateProfile



    await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            bio
        }
    })

    return res.status(201).end()

}