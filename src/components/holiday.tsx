'use client'

import { Holiday, ReachChild } from "@/types";
import { format, formatDistanceToNowStrict } from "date-fns";
import { es as locale } from "date-fns/locale/es";
import { isWeekDay, isDayMayor, getHolidayKindLabel } from "@/util/util";
import { TODAY } from "@/constants";

type Props = {
    holiday: Holiday,
};

/** displays a single holiday */
export default function HolidayList(props: Props) {
    /** all labels for given holiday */
    const labels = (holiday: Holiday): ReachChild => {
        if (holiday.labels && holiday.labels.length > 0) {
            return holiday.labels.map((label, k) => {
                return <span key={k} className="whitespace-nowrap bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    {label}
                </span>;
            });
        }
        return <></>;
    };

    /** date object of the holiday, or raw date string */
    const date = (holiday: Holiday): ReachChild => {
        if (holiday.computedDate) {
            return <>
                <p className="font-semibold">{format(holiday.computedDate, 'EEEE d \'de\' MMMM', { locale })}</p>
                {isDayMayor(holiday.computedDate, TODAY) ? <p className="text-sm">Dentro de&nbsp;
                    {formatDistanceToNowStrict(holiday.computedDate, { locale, unit: 'day' })}
                </p> : <></>}
            </>;
        }
        return <p className="font-semibold text-sm">{holiday.date}</p>;
    };

    return <div className={`py-2 px-4 ${isWeekDay(props.holiday) ? 'bg-lime-50' : ''}`}>
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0 gap-1">
                <p className="text-sm font-medium text-gray-900">
                    {props.holiday.name}
                </p>
                <div className="flex flex-row gap-1 flex-wrap">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getHolidayKindLabel(props.holiday)}, {props.holiday.law}
                    </p>
                    <div className="flex flex-row gap-1">
                        {props.holiday.inalienable ? <span
                            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 whitespace-nowrap">✨ Irrenunciable</span> : <></>}
                        {labels(props.holiday)}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end text-base text-gray-900">
                {date(props.holiday)}
            </div>
        </div>
    </div>;
}