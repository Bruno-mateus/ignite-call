import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../lib/axios";
import { Container, TimePickerHeader, TimePickerList, TimePicker, TimePickerItem } from "./styles";

interface Availability {
    possibleTimes:number[]
    availablesTimes:number[]
    blockedTimes:number[]
}

interface CaledarTimeProps{
    onSelectDateTime: (hour:Date)=>void
}

export function CalendarStep({onSelectDateTime}:CaledarTimeProps){
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    
    const isDateSelected = selectedDate != null
    const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
    const describedDate = selectedDate?dayjs(selectedDate).format("DD[ de ]MMMM"):null;
    const router = useRouter();

    const username = String(router.query.username);
    const isSelectedDate = selectedDate?dayjs(selectedDate).format("YYYY-MM-DD"):null

  
    const {data:availability} = useQuery<Availability>(
        ["availability",isSelectedDate],
        async ()=>{
           const res = await api.get(`/users/${username}/availability`,{
                params:{
                    date:isSelectedDate
                    
                }
            })
            
            return res.data
            
        },{
            enabled:!!selectedDate
        }
        )

        const unavailableTimes = availability?.availablesTimes.map(
            (availableTime) => {
              return dayjs(availableTime).get('hour')
            },
          )
    

        function handleSelectDateAndTime(hour:number){
            //pega data e horario selecionado
            const dateWithTime = dayjs(selectedDate).set('hour',hour).startOf('hour').toDate();
            onSelectDateTime(dateWithTime)
        }
        
    return(
        <Container isTimePickerOpen={isDateSelected}>
            <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate}/>
            <TimePicker className="timerPicker">
            <TimePickerList>
                <TimePickerHeader>
                {weekDay}, <span>{describedDate}</span>
                </TimePickerHeader>
                {
                    availability?.possibleTimes.map(hour=>{
                        console.log(availability.blockedTimes)
                        return(
                            <TimePickerItem 
                                key={hour}
                                 disabled={
                                    unavailableTimes?.includes(hour) ||
                                    dayjs(selectedDate).set('hour', hour).isBefore(new Date())
                                }
                                onClick={()=>{
                                    handleSelectDateAndTime(hour)
                                }}
                                >
                                {
                                    String(hour).padStart(2,"0")+":00h" 
                                }
                            </TimePickerItem>
                        )
                    })
                }
            </TimePickerList>
            </TimePicker>

        </Container>
    )
}