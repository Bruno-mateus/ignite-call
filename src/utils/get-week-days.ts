export function getDays() {
  const formmater = new Intl.DateTimeFormat('pt-br', { weekday: 'long' })
  const weekDays = Array.from(Array(7).keys())
  return weekDays
    .map((weekDay) => formmater.format(new Date(Date.UTC(2021, 5, weekDay))))
    .map((day) => day.substring(0, 1).toUpperCase().concat(day.substring(1)))
}
