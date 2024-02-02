'use client'

import { parseHolidays } from "@/util/util";
import Home from "./../../components/home";
import holidays from "./../../data/2025.json";
import { RawHoliday } from "@/types";

/** just display the page with holidays for year 2025, we want to include holidays data in source js to boost the page load */
export default function Page() {
    return <Home year={2025} holidays={parseHolidays(holidays as RawHoliday[])} />
}