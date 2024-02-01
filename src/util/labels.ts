import { Holiday } from "@/types";

export const getHolidayKindLabel = (holiday: Holiday): string => {
    if (holiday.location) {
        return holiday.location;
    }

    switch (holiday.type) {
        case 'civil':
            return 'Civil';
        case 'religious':
            return 'Religioso';
        default:
        case 'location':
            return '';
    }
}