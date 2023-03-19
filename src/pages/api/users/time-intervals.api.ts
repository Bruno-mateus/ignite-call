import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import * as z from 'zod'
import { prisma } from "../../../lib/prisma"

interface ITimeIntervals {
    weekday: number,
    endTimeInMinutes: number
    startTimeInMinutes: number,
    user_id: string
}

export default async function Handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
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
    const intervals = req.body as ITimeIntervals[]



    await prisma.userTimeInterval.createMany({
        data: intervals.map(interval => {
            return {
                user_id: session.user?.id,
                week_day: interval.weekday,
                time_end_in_minutes: interval.endTimeInMinutes,
                time_start_in_minutes: interval.startTimeInMinutes,

            }
        })
    })

    return res.json({
        session
    })
}