'use client'

import { CalendarDate, Holiday } from "@/types";
import { getMonthCalendar, getMonthsDates, MONTHS } from "@/util/month";
import { useState } from "react";
import { format } from "date-fns";
import { es as locale } from "date-fns/locale/es";
import { CURRENT_YEAR, TODAY } from "@/constants";
import HolidayComponent from "./holiday";
import { preventClickDefault } from "@/util/util";

type Props = {
    holidays: Holiday[];
    year: number;
}

/** print list of months in calendar format to view de holidays */
export default function Months(props: Props) {
    /** months to display */
    const [months, setMonths] = useState<Date[]>(getMonthsDates(MONTHS, props.year || CURRENT_YEAR));

    /** displays a dialog with the detail of selected holiday */
    const [activeHoliday, setActiveHoliday] = useState<Holiday | null>(null);

    /** returns the classname for holiday html element in calendar */
    const getDayClassName = (date: CalendarDate, month: number): string => {
        const className: string[] = ['w-5 h-5 flex justify-center items-center rounded-full'];
        if (date.date.getMonth() === month) {
            if (date.isToday) className.push('bg-slate-300');
            if (date.holiday) {
                className.push('cursor-pointer');
                if (date.isPast) {
                    className.push('bg-lime-100');
                } else if (date.isLocalized) {
                    className.push('bg-lime-200');
                } else {
                    className.push('bg-lime-400');
                }
            }
        } else {
            className.push('text-slate-400');
        }
        return className.join(' ');
    }

    /** displays the holiday dialog */
    const displayHoliday = (date: CalendarDate): void => {
        if (date.holiday) {
            setActiveHoliday(date.holiday);
        }
    }

    /** hide the holiday dialog */
    const hideHoliday = (): void => {
        setActiveHoliday(null);
    }

    return <>
        <div className="flex flex-col gap-3 max-w-md text-xs">
            {months.map((month, k) => <div className="shadow-lg bg-white rounded-lg p-4 w-full flex flex-col gap-1" key={k}>
                <p className="text-center text-base">{format(month, 'MMMM yyyy', { locale })}</p>
                <div className="flex flex-row justify-between pb-1">
                    <div className="w-6 flex justify-center">L</div>
                    <div className="w-6 flex justify-center">M</div>
                    <div className="w-6 flex justify-center">M</div>
                    <div className="w-6 flex justify-center">J</div>
                    <div className="w-6 flex justify-center">V</div>
                    <div className="w-6 flex justify-center">S</div>
                    <div className="w-6 flex justify-center">D</div>
                </div>
                {getMonthCalendar(month, props.holidays, TODAY).map((week, k) => <div className="flex flex-row justify-between" key={k}>
                    {week.map((day, k) => <div title={day.holiday ? day.holiday.name : ''}
                        className={getDayClassName(day, month.getMonth())} key={k} onClick={() => displayHoliday(day)}>
                        {day.date.getDate()}
                    </div>)}
                </div>)}
            </div>)}
        </div>

        {activeHoliday ?
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={hideHoliday}></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div onClick={hideHoliday} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div onClick={preventClickDefault} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <HolidayComponent holiday={activeHoliday} />
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" onClick={hideHoliday}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <></>}
    </>;
}