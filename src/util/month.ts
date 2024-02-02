import { Month } from "../../node_modules/date-fns/types";
import { previousMonday } from "../../node_modules/date-fns/previousMonday";
import { parse, add, isSameDay } from "date-fns";
import { CalendarDate, Holiday } from "@/types";
import { isDayMayor } from "./util";

/** months to display in calendar section */
export const MONTHS: Month[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/** get all months as date object as first day of month */
export const getMonthsDates = (months: Month[], year: number): Date[] => {
    return months.map(month => parse(`${year}-${month + 1}-01`, 'yyyy-M-dd', new Date()));
};

/** get all dates in calendar, can include previous and next month days to fill days from monday to sunday */
export const getMonthCalendar = (month: Date, holidays: Holiday[], today: Date): CalendarDate[][] => {
    const dates: CalendarDate[][] = [];
    const monthNumber: number = month.getMonth();
    let currentDate: Date = parse(`${month.getFullYear()}-${month.getMonth() + 1}-01`, 'yyyy-M-dd', new Date());
    let isPast: boolean = true;

    if (currentDate.getDay() !== 1) { // print from monday
        currentDate = previousMonday(currentDate);
    }

    let datesLength = dates.length;

    while (currentDate.getMonth() === monthNumber || datesLength === 0 ||
        (datesLength > 0 && dates[datesLength - 1].length !== 7)) {
        if (currentDate.getDay() === 1) {
            dates.push([]);
            datesLength = dates.length;
        }

        if (isPast) {
            isPast = isDayMayor(today, currentDate);
        }

        const holiday = getHolidayFromDate(currentDate, holidays);
        dates[datesLength - 1].push({
            date: new Date(currentDate.valueOf()),
            holiday,
            isLocalized: holiday ? !!holiday.location : false,
            isPast: isPast,
            isToday: isSameDay(today, currentDate),
        });

        currentDate = add(currentDate, { days: 1 });
    }
    return dates;
};

/** find a holiday for given date, or undefined */
export const getHolidayFromDate = (date: Date, holidays: Holiday[]): Holiday | undefined => {
    return holidays.find(holiday => holiday.computedDate && isSameDay(date, holiday.computedDate));
};
