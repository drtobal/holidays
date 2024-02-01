import { parse, isValid } from "date-fns";
import { Holiday, RawHoliday, AvailableYear } from "@/types";
import { CURRENT_YEAR } from "@/constants";

// implement 2025
export const getDates = async (year: AvailableYear = 2024): Promise<Holiday[]> => {
    switch (year) {
        case 2024:
            return parseDates((await import('./../data/2024.json')).default as RawHoliday[]);
        case 2025:
            return parseDates((await import('./../data/2025.json')).default as RawHoliday[]);
    }
};

export const parseDates = (dates: RawHoliday[]): Holiday[] => {
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

export const isDateMayor = (a: Date, b: Date): boolean => {
    return a.valueOf() > b.valueOf();
}

export const getLeftDays = (holidays: Holiday[], date: Date): Holiday[] => {
    const year = date.getFullYear();
    return holidays.filter(holiday => {
        if (!holiday.computedDate || holiday.location ||
            holiday.computedDate.getFullYear() !== year ||
            !isDateMayor(holiday.computedDate, date)) {
            return false;
        }

        return true;
    });
}

export const getWeekDays = (holidays: Holiday[]): Holiday[] => {
    return holidays.filter(isWeekDay);
}

export const isWeekDay = (holiday: Holiday): boolean => {
    return !!(holiday.computedDate && holiday.computedDate.getDay() % 6 !== 0);
}

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
