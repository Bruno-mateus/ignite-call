import dayjs from 'dayjs';
import {NextApiRequest, NextApiResponse} from 'next';
import { prisma } from '../../../../lib/prisma';
export default async function handle(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET'){
        return res.status(405).end();
    }
    const username = String(req.query.username)

    const {date} = req.query

    if(!date) res.status(400).json({message:'Date not provider'})
    
    const user = await prisma.user.findFirst({
        where:{
            username
        }
    })

    if(!user) res.status(400).json({message:'User does not exists'})
    
    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if(isPastDate) res.json({possibleTimes:[],availablesTimes:[]})
    
    const userAvailability = await prisma.userTimeInterval.findFirst({
        where:{
            //@ts-ignore
            user_id:user.id,
            week_day:referenceDate.get('day')
        }
    })
    
    if(!userAvailability) res.json({possibleTimes:[],availablesTimes:[]})


    //@ts-ignore
    const {time_start_in_minutes, time_end_in_minutes} = userAvailability
    

    //convert minutes to hours
    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({
        length:endHour - startHour
    }).map((_,i)=>{
        return startHour + i
    })

    const blockedTimes = await prisma.scheduling.findMany({
        select:{
            date:true
        },
        where:{
            user_id:user?.id,
            date:{
                //great than or equal
                gte:referenceDate.startOf('day').toDate(),
                //less than or equal
                lte:referenceDate.endOf('day').toDate()
            }
        }
    })
  
    const availablesTimes = blockedTimes.map((schedules) => {
        return schedules.date
      })
      
    return res.json({
        possibleTimes,
        availablesTimes,
        blockedTimes
    })
}