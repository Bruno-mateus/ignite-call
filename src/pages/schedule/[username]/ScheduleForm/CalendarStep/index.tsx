import { Calendar } from "../../../../../components/Calendar";
import { Container, TimePickerHeader, TimePickerList, TimePicker, TimePickerButton } from "./styles";

export function CalendarStep(){
    return(
        <Container isTimePickerOpen={true}>
            <Calendar/>
            <TimePicker>
            <TimePickerList>
                <TimePickerHeader>
                terça-feira, <span>20 de setembro</span>
                </TimePickerHeader>
                <TimePickerButton>
                    13:00
                </TimePickerButton>
                <TimePickerButton>
                    14:00
                </TimePickerButton>
                <TimePickerButton>
                    15:00
                </TimePickerButton>
                <TimePickerButton>
                    16:00
                </TimePickerButton>
                <TimePickerButton>
                    17:00
                </TimePickerButton>
            </TimePickerList>
            </TimePicker>

        </Container>
    )
}