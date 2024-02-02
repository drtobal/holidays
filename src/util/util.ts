import { parse, isValid } from "date-fns";
import { Holiday, RawHoliday } from "@/types";
import { CURRENT_YEAR } from "@/constants";

/** parse holidays dates */
export const parseHolidays = (dates: RawHoliday[]): Holiday[] => {
    return dates.map(d => {
        if (d.date) {
            const date = parse(d.date, 'yyyy-MM-dd', new Date());
            if (isValid(date)) {
                (d as Holiday).computedDate = date;
            }
        }
        return d;
    });
}

/** check if date a is mayor than date b */
export const isDayMayor = (a: Date, b: Date): boolean => {
    return (new Date(a.getFullYear(), a.getMonth(), a.getDate())).getTime() > (new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime();
}

/** check how many holidays are in the future of date */
export const getLeftDays = (holidays: Holiday[], date: Date): Holiday[] => {
    const year = date.getFullYear();
    return holidays.filter(holiday => {
        if (!holiday.computedDate || holiday.location ||
            holiday.computedDate.getFullYear() !== year ||
            !isDayMayor(holiday.computedDate, date)) {
            return false;
        }

        return true;
    });
}

/** filter holidays that are weekdays (m, t, w, t, f) */
export const getWeekDays = (holidays: Holiday[]): Holiday[] => {
    return holidays.filter(isWeekDay);
}

/** check if given holiday is weekday (m, t, w, t, f)  */
export const isWeekDay = (holiday: Holiday): boolean => {
    return !!(holiday.computedDate && holiday.computedDate.getDay() % 6 !== 0);
}

/** returns the label for holidays left in the year */
export const getLeftDaysLabel = (leftDays: Holiday[], weekDays: Holiday[], year: number): string => {
    const isSameYear = year === CURRENT_YEAR;
    const leftDaysCount = leftDays.length;
    const weekDaysCount = weekDays.length;
    let text: string = '';
    if (leftDaysCount > 0) {
        if (leftDaysCount > 1) {
            if (isSameYear) {
                text += `Quedan ${leftDays.length} días feriados este año 🤭`;
            } else {
                text += `El año ${year} tendrá ${leftDays.length} días feriados 🤭`;
            }
        } else {
            text += `Queda 1 día feriado este año 🤭`;
        }
    }

    if (weekDaysCount > 0) {
        if (weekDaysCount > 1) {
            text += `, ${weekDays.length} son días de semana 🥳🥳🥳`;
        } else {
            text += `, un día de semana 🥳🥳🥳`;
        }
    }
    return text;
}

/** prevent and stop propagation of mouse event */
export const preventClickDefault = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
};

/** returns a label for holiday kind */
export const getHolidayKindLabel = (holiday: Holiday): string => {
    if (holiday.location) {
        return holiday.location;
    }

    switch (holiday.type) {
        case 'civil':
            return 'Civil';
        case 'religious':
            return 'Religioso';
        default:
        case 'location':
            return '';
    }
};