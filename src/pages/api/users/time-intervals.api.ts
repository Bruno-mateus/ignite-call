import { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import {buildNextAuthOptions} from '../../api/auth/[...nextauth].api'

export async function Handle(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== "GET"){
        return res.status(405).end()
    }

    const session = await unstable_getServerSession({
        res,
        req,
        buildNextAuthOptions
    })
    return res.json({
        session
    })
}