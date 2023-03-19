import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";
export function ScheduleForm() {
    const [dateAndTimeSelected, setDateAndTimeSelected] = useState<Date | null>()

    if (dateAndTimeSelected) {
        return <ConfirmStep scheduleDateAndTime={dateAndTimeSelected} closeConfirmStep={setDateAndTimeSelected} />
    }

    return <CalendarStep onSelectDateTime={setDateAndTimeSelected} />
}