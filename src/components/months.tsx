import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Holiday } from "@/types";
import { getMonthDates } from '@/util/util';
import { useState } from 'react';

type Props = {
    holidays: Holiday[];
}

export default function Months(props: Props) {
    const [months, setMonths] = useState<Date[]>(getMonthDates());

    return <>{months.map((date, k) => <div key={k}>
        <DateCalendar defaultValue={date} disabled />
    </div>)}</>;
}