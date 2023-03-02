import dayjs from 'dayjs';
import {NextApiRequest, NextApiResponse} from 'next';
import { google } from "googleapis";
import { prisma } from '../../../../lib/prisma';
import * as z from 'zod'
import { getGoogleOAuthToken } from '../../../../lib/google';

export default async function handle(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    const username = String(req.query.username)
    console.log(username)

    const user = await prisma.user.findFirst({
        where:{
            username
        }
    })

    if(!user) {
        return res.status(400).json({message:'User does not exists'})
    }
    
    
  
    const createSchedulingBody = z.object({
        name:z.string(),
        email:z.string(),
        observations:z.string(),
        date:z.string().datetime()
    })

    const {name,email,observations,date} = createSchedulingBody.parse(req.body)

    const parseDate = dayjs(date).startOf('hour')
    
    if(parseDate.isBefore(new Date())){
        return res.json({
            message:"Date is in the past"
        })
    }
  
    const conflitScheduling = await prisma.scheduling.findFirst({
        where:{
            //@ts-ignore
            user_id: user.id,
            date: parseDate.toDate()
        }
    })
       
    if(conflitScheduling){
        return res.json({
            message:"There is another scheduling at the same time"
        })
    }

    const scheduling = await prisma.scheduling.create({
        data:{
            name,
            email,
            observations,
            date:parseDate.toDate(),
            //@ts-ignore
            user_id:user.id          
        }
    })

    const calendar = google.calendar({
        version:"v3",
        auth: await getGoogleOAuthToken(user.id)
    })

    await calendar.events.insert({
        calendarId:'primary',
        conferenceDataVersion:1,
        requestBody:{
            summary:`Ignite Call: ${user.name}`,
            description:observations,
            start:{
                dateTime:parseDate.format()
            },
            end:{
                dateTime:parseDate.add(1,'hour').format()
            },
            attendees:[{email,displayName:name}],
            conferenceData:{
                createRequest:{
                    requestId:scheduling.id,
                    conferenceSolutionKey:{
                        type:"hangoutsMeet"
                    }
                }
            }
        }
    })

    return res.status(201).end()
}