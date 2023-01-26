import { CaretLeft, CaretRight } from "phosphor-react";
import { getDays } from "../../utils/get-week-days";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";

export function Calendar(){
    const shortWeekdays = getDays({short:true})
    return(
        <CalendarContainer>
            <CalendarHeader>
                <CalendarTitle>
                    Janeiro <span>2023</span>
                </CalendarTitle>
                <CalendarActions>
                <button>
                    <CaretLeft/>
                </button>
                <button>
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
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><CalendarDay>1</CalendarDay></td>
                    <td><CalendarDay>2</CalendarDay></td>
                    <td><CalendarDay>3</CalendarDay></td>
                    <td><CalendarDay>4</CalendarDay></td>
                </tr>
                <tr>
                    <td><CalendarDay>5</CalendarDay></td>
                    <td><CalendarDay>6</CalendarDay></td>
                    <td><CalendarDay>7</CalendarDay></td>
                    <td><CalendarDay>8</CalendarDay></td>
                    <td><CalendarDay>9</CalendarDay></td>
                    <td><CalendarDay>10</CalendarDay></td>
                    <td><CalendarDay>11</CalendarDay></td>
                </tr>
            </tbody>
          </CalendarBody>
        </CalendarContainer>
    )
}