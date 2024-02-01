import { Holiday, ReachChild } from "@/types";
import { getHolidayKindLabel } from "@/util/labels";
import { format, formatDistanceToNowStrict } from "date-fns";
import { es as locale } from 'date-fns/locale/es';
import { isDateMayor, isWeekDay } from "@/util/util";
import { TODAY } from "@/constants";

type Props = {
    holidays: Holiday[],
    children?: ReachChild,
};

export default function HolidayList(props: Props) {
    let printedToday: boolean = false;

    const labels = (holiday: Holiday): ReachChild => {
        if (holiday.labels && holiday.labels.length > 0) {
            return holiday.labels.map((label, k) => {
                return <span className="whitespace-nowrap bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center" key={k}>
                    {label}
                </span>;
            });
        }
        return <></>;
    };

    const date = (holiday: Holiday): ReachChild => {
        if (holiday.computedDate) {
            return <>
                <p className="font-semibold">{format(holiday.computedDate, 'EEEE d \'de\' MMMM', { locale })}</p>
                {isDateMayor(holiday.computedDate, TODAY) ? <p className="text-sm">Dentro de&nbsp;
                    {formatDistanceToNowStrict(holiday.computedDate, { locale, unit: 'day' })}
                </p> : <></>}
            </>;
        }
        return <p className="font-semibold text-sm">{holiday.date}</p>;
    };

    const today = (holiday: Holiday): ReachChild => {
        if (!printedToday && holiday.computedDate && isDateMayor(holiday.computedDate, TODAY)) {
            printedToday = true;
            return <li className="py-2 px-4 bg-teal-100">
                <p className="text-center">👉 Hoy 👈</p>
            </li>;
        }
        return <></>;
    }

    return <div className="max-w-md pt-0">

        {props.children ? props.children : <></>}

        <ul className="divide-y divide-gray-200 bg-white dark:divide-gray-700 mx-auto rounded-md py-4 shadow-lg">
            {props.holidays.map((holiday, k) =>
                <>
                    {today(holiday)}
                    <li key={k} className={`py-2 px-4 ${isWeekDay(holiday) ? 'bg-lime-50' : ''}`}>
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                            <div className="flex-1 min-w-0 gap-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {holiday.name}
                                </p>
                                <div className="flex flex-row gap-1 flex-wrap">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {getHolidayKindLabel(holiday)}, {holiday.law}
                                    </p>
                                    <div className="flex flex-row gap-1">
                                        {holiday.inalienable ? <span
                                            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 whitespace-nowrap">✨ Irrenunciable</span> : <></>}
                                        {labels(holiday)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end text-base text-gray-900">
                                {date(holiday)}
                            </div>
                        </div>
                    </li>
                </>
            )}
        </ul>
    </div>;
}
