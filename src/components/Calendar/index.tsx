import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo, useState } from "react";
import { api } from "../../lib/axios";
import { getDays } from "../../utils/get-week-days";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";

interface CalendarWeek {
    week:number,
    days:Array<{
        date:dayjs.Dayjs,
        disabled:boolean,

    }>
}

interface BlockedWeekDays{
    blockedWeekDays: number[]
    blockedDates: number[]
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps{
    selectedDate:Date | null
    onDateSelected:(date:Date)=>void
}

export function Calendar({onDateSelected,selectedDate}:CalendarProps){

    
    const [currentDate, setCurrentDate] = useState(()=>{
        return dayjs().set('date',1)
    });

    const currentMonth= currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');

    const router = useRouter()
    const username = String(router.query.username)

    const {data:blockedDays} = useQuery<BlockedWeekDays>(
        ["blocked-days",currentDate.get("year"),currentDate.get("month")],
        async ()=>{
           const response = await api.get(`/users/${username}/blocked-dates`,{
                params:{
                    year:currentDate.get("year"),
                    month:currentDate.get("month") + 1
                }
            })

            return response.data

        }
        )


    const calendarWeeks = useMemo(()=>{

        if(!blockedDays){
            return []
        }

        const daysInMonthArray = Array.from({
            length:currentDate.daysInMonth()
        }).map((_,i)=>{
            return currentDate.set('date',i+1)
        })
        const firstWeekDayInMonth = currentDate.get('day') // 0 1 2 3 4 5 6

        const previousMonthFillArray = Array.from({
            length: firstWeekDayInMonth,
          })
            .map((_, i) => {
              return currentDate.subtract(i + 1, 'day')
            }).reverse()

     

            const lastDayInMonth = currentDate.set('date',currentDate.daysInMonth())
            const lastWeekDay = lastDayInMonth.get('day')
            const nextMonthFillArray = Array.from({
                length:6 - lastWeekDay
            }).map((_,i)=>{
                return lastDayInMonth.add(i + 1, 'day')
            })
           
           const calendarDays = [
                ...previousMonthFillArray.map(date=>{
                return {
                    date,
                    disabled:true
                }
            }),
            ...daysInMonthArray.map(date=>{
                return {
                    date,
                    disabled:date.endOf('day').isBefore(new Date())?true:false||
                    blockedDays.blockedWeekDays.includes(date.get('day'))||
                    blockedDays.blockedDates.includes(date.get('date'))
                }
            }),
            
            ...nextMonthFillArray.map(date=>{
                return {
                    date,
                    disabled:true
                }
            })
        ]


        const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
            (weeks,_,i,original)=>{
                const isNewWeek = i%7 === 0
                if(isNewWeek){
                    weeks.push({
                        week:Math.floor(i/7+1),
                        days:original.slice(i,i+7)
                    })
                }
                
                return weeks
            },[]
            )

           
             return calendarWeeks


    },[currentDate, blockedDays])



    const shortWeekdays = getDays({short:true})

    function handlePreviousMonth(){
        const date = currentDate.subtract(1, 'month');
        setCurrentDate(()=>date)
    }
    function handleNextMonth(){
        const date = currentDate.add(1, 'month');
        setCurrentDate(()=>date)
    }
    return(
        <CalendarContainer>
                <CalendarHeader>
                    <CalendarTitle>
                        {currentMonth} <span>{currentYear}</span>
                    </CalendarTitle>
                    <CalendarActions>
                    <button onClick={()=>handlePreviousMonth()} title="previous month">
                        <CaretLeft/>
                    </button>
                    <button onClick={()=>handleNextMonth()} title="next month">
                        <CaretRight/>
                    </button>
                </CalendarActions>
                </CalendarHeader>
          <CalendarBody>
            <thead>
                <tr>
                {
                    shortWeekdays.map(day=>{
                        return(
                            <th key={day}>{day}</th>
                        )
                    })
                }
                </tr>
      
            </thead>
            <tbody>
                {
                    calendarWeeks.map(({week,days})=>{
                        return(
                            <tr key={week}>
                                {
                                    days.map(({date,disabled})=>{
                                        return (
                                            <td key={date.toString()}>
                                                <CalendarDay 
                                                    onClick={()=>onDateSelected(date.toDate())}
                                                    disabled={disabled}>
                                                    {date.get('date')}
                                                </CalendarDay>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
          </CalendarBody>
        </CalendarContainer>
    )
}