'use client'

import { AvailableYear, Holiday, ReachChild } from "@/types";
import HolidayList from "./../components/holidays-list";
import { useEffect, useRef, useState } from "react";
import { getDates, getLeftDays, getLeftDaysLabel, getWeekDays } from "@/util/util";
import { CURRENT_YEAR } from "@/constants";
import Footer from "./../components/footer";
import Months from "./../components/months";
import { formatDistanceToNowStrict, parse } from "date-fns";
import { es as locale } from "date-fns/locale/es";
import Link from "next/link";

type Props = {
  year: AvailableYear,
};

export default function Home(props: Props = { year: CURRENT_YEAR }) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [leftDays, setLeftDays] = useState<Holiday[]>([]);

  const [weekDays, setWeekDays] = useState<Holiday[]>([]);

  const initialized = useRef<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      if (!initialized.current) {
        initialized.current = true;
        const year = props.year || CURRENT_YEAR;
        const days = await getDates(year);
        const leftDays = getLeftDays(days, parse(`${year}-01-01`, 'yyyy-M-dd', new Date()));
        setHolidays(days);
        setLeftDays(leftDays);
        setWeekDays(getWeekDays(leftDays));
      }
    })();
  }, []);

  const nextHoliday = (): ReachChild => {
    if (leftDays.length > 0 && props.year === CURRENT_YEAR) {
      return <span className="mb-3 text-sm">
        Próximo feriado: <span className="font-bold">{leftDays[0].name}</span>
        {leftDays[0].computedDate ?
          <>, dentro de {formatDistanceToNowStrict(leftDays[0].computedDate, { locale, unit: 'day' })}</> : <></>}
      </span>
    }
    return <></>;
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mt-7">Feriados de Chile, {props.year || CURRENT_YEAR}</h1>
          <p className="text-sm mb-2">{getLeftDaysLabel(leftDays, weekDays, props.year)}</p>
          <p className="mb-5 text-sm">{nextHoliday()}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col items-end">
            <HolidayList holidays={holidays.filter(h => !h.location)} year={props.year} />

            <HolidayList holidays={holidays.filter(h => h.location)} year={props.year}>
              <h1 className="mt-5">Feriados específicos</h1>
              <p className="mb-3 text-sm">(Aplican a un grupo de personas o región)</p>
            </HolidayList>
          </div>
          <div className="flex flex-col">
            <Months holidays={holidays} year={props.year} />

            {!props.year || props.year === CURRENT_YEAR ?
              <Link href="/2025" className="max-w-md mt-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">
                Ver 2025
              </Link> : <Link href="/" className="max-w-md mt-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">
                Ver año actual
              </Link>}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
