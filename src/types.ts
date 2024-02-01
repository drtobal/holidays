import { ReactElement } from "react";

export type HolidayKind = 'civil' | 'religious' | 'location';

export type RawHoliday = {
    name: string;
    type: HolidayKind;
    law: string;
    labels: string[];
    date?: string;
    location?: string;
    inalienable?: boolean;
};

export interface Holiday extends RawHoliday {
    computedDate?: Date;
}

/** available year to display, this is a fixed data, we don't want dynamic year to validate */
export type AvailableYear = 2024 | 2025;

export type ReachChild = string | ReactElement | ReactElement[];

export type FooterLink = {
    label: string;
    url: string;
};

export type CalendarDate = {
    date: Date;
    holiday?: Holiday;
    isToday?: boolean;
    isPast?: boolean;
    isLocalized?: boolean;
};
