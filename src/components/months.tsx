'use client'

import { Holiday } from "@/types";
import { getMonthCalendar, getMonthsDates, MONTHS } from "@/util/month";
import { useState } from 'react';
import { format } from "date-fns";
import { es as locale } from "date-fns/locale/es";
import { DEFAULT_YEAR } from "@/constants";

type Props = {
    holidays: Holiday[];
    year: number;
}

export default function Months(props: Props) {
    const [months, setMonths] = useState<Date[]>(getMonthsDates(MONTHS, props.year || DEFAULT_YEAR));

    return <div className="flex flex-col gap-3 max-w-md">
        {months.map((month, k) => <div className="shadow-lg bg-white rounded-lg p-4 w-full" key={k}>
            <p className="text-center">{format(month, 'MMMM yyyy', { locale })}</p>
            <div className="flex flex-row justify-between">
                <div className="w-6 flex justify-center">L</div>
                <div className="w-6 flex justify-center">M</div>
                <div className="w-6 flex justify-center">M</div>
                <div className="w-6 flex justify-center">J</div>
                <div className="w-6 flex justify-center">V</div>
                <div className="w-6 flex justify-center">S</div>
                <div className="w-6 flex justify-center">D</div>
            </div>
            {getMonthCalendar(month).map((week, k) => <div className="flex flex-row justify-between" key={k}>
                {week.map((day, k) => <div className="w-6 flex justify-center" key={k}>{day.getDate()}</div>)}
            </div>)}
        </div>)}
    </div>;
}