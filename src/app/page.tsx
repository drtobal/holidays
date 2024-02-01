'use client'

import { AvailableYear, Holiday } from "@/types";
import HolidayList from "./../components/holidays-list";
import { useState } from "react";
import { getDates, getLeftDays, getLeftDaysLabel, getWeekDays } from "@/util/util";
import { DEFAULT_YEAR, TODAY } from "@/constants";
import Footer from "./../components/footer";
import { formatDistanceToNowStrict } from "date-fns";
import { es as locale } from 'date-fns/locale/es';

type Props = {
  year: AvailableYear,
};

export default function Home(props: Props) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const [leftDays, setLeftDays] = useState<Holiday[]>([]);

  const [weekDays, setWeekDays] = useState<Holiday[]>([]);

  const setUp = async (): Promise<void> => {
    const days = await getDates(props.year | DEFAULT_YEAR);
    const leftDays = getLeftDays(days, TODAY);
    setHolidays(days);
    setLeftDays(leftDays);
    setWeekDays(getWeekDays(leftDays));
  };

  setUp();

  return (
    <>
      <div className="container mx-auto">
        <h1 className="mt-5">Feriados de Chile, {props.year | DEFAULT_YEAR}</h1>
        <p className="mb-3 text-sm">{getLeftDaysLabel(leftDays, weekDays)}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <HolidayList holidays={holidays.filter(h => !h.location)}>
              {leftDays.length > 0 ? <p className="mb-3 text-sm">
                Próximo feriado: <span className="font-bold">{leftDays[0].name}</span>
                {leftDays[0].computedDate ?
                  <>, dentro de {formatDistanceToNowStrict(leftDays[0].computedDate, { locale, unit: 'day' })}</> : <></>}
              </p> : <></>}
            </HolidayList>

            <HolidayList holidays={holidays.filter(h => h.location)}>
              <h1 className="mt-5">Feriados específicos</h1>
              <p className="mb-3 text-sm">(Aplican a un grupo de personas o región)</p>
            </HolidayList>
          </div>
          <div>
            asdfasdf
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
