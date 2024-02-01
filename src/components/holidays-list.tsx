'use client'

import { Holiday, ReachChild } from "@/types";
import { isDateMayor } from "@/util/util";
import { CURRENT_YEAR, TODAY } from "@/constants";
import HolidayComponent from "./holiday";
import { AvailableYear } from "@/types";

type Props = {
    holidays: Holiday[],
    children?: ReachChild,
    year: AvailableYear,
};

export default function HolidayList(props: Props) {
    let printedToday = false;

    const today = (holiday: Holiday): ReachChild => {
        if (props.year === CURRENT_YEAR && !printedToday && holiday.computedDate && isDateMayor(holiday.computedDate, TODAY)) {
            printedToday = true;
            return <div className="py-2 px-4 bg-teal-100">
                <p className="text-center">👉 Hoy 👈</p>
            </div>;
        }
        return <></>;
    }

    return <div className="max-w-md pt-0">

        {props.children ? props.children : <></>}

        <div className="divide-y divide-gray-200 bg-white dark:divide-gray-700 mx-auto rounded-md py-4 shadow-lg">
            {props.holidays.map((holiday, k) =>
                <div key={k}>
                    {today(holiday)}
                    <HolidayComponent holiday={holiday} />
                </div>
            )}
        </div>
    </div>;
}
