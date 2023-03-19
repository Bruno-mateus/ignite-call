interface GetWeekDaysParams {
    short?: boolean;
}

export function getDays({ short = false }: GetWeekDaysParams = {}) {
    const formmater = new Intl.DateTimeFormat('pt-br', { weekday: 'long' })
    const weekDays = Array.from(Array(7).keys())
    return weekDays
        .map((day) => formmater.format(new Date(Date.UTC(2021, 5, day))))
        .map((weekday) => {
            if (short) {
                return weekday.substring(0, 3).toUpperCase()
            }
            return weekday.substring(0, 1).toUpperCase().concat(weekday.substring(1));
        })


}
