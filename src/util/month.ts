import { Month } from "../../node_modules/date-fns/types";
import { previousMonday } from "../../node_modules/date-fns/previousMonday";
import { parse, add } from "date-fns";

export const MONTHS: Month[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const getMonthsDates = (months: Month[], year: number): Date[] => {
    return months.map(month => parse(`${year}-${month + 1}-01`, 'yyyy-M-dd', new Date()));
}

export const getMonthCalendar = (month: Date): Date[][] => {
    const dates: Date[][] = [[]];
    const monthNumber: number = month.getMonth();
    let currentDate: Date = parse(`${month.getFullYear()}-${month.getMonth() + 1}-01`, 'yyyy-M-dd', new Date());

    console.log(monthNumber, currentDate.toISOString());

    if (currentDate.getDay() !== 1) { // print from monday
        currentDate = previousMonday(currentDate);
    }

    let datesLength = dates.length;
    while (currentDate.getMonth() === monthNumber || (datesLength > 0 && dates[datesLength - 1].length !== 7)) {
        if (currentDate.getDay() === 1) {
            dates.push([]);
            datesLength = dates.length;
        }
        dates[datesLength - 1].push(new Date(currentDate.valueOf()));
        currentDate = add(currentDate, { days: 1 });
    }

    return dates;
};
