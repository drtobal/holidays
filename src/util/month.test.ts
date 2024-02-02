import { getMonthCalendar, getMonthsDates } from "./month";

describe("Util functions", () => {
    test('should return all months in date format', () => {
        expect(getMonthsDates([0, 1, 2], 2024)).toEqual([
            new Date('2024-01-01T00:00:00'),
            new Date('2024-02-01T00:00:00'),
            new Date('2024-03-01T00:00:00'),
        ]);
    });

    test('should return the entire month weeks', () => {
        expect(getMonthCalendar(new Date('2024-01-01T00:00:00'), [], new Date('2024-01-01T00:00:00'))).toEqual([
            [
                { date: new Date("2024-01-01T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: true },
                { date: new Date("2024-01-02T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-03T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-04T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-05T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-06T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-07T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-01-08T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-09T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-10T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-11T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-12T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-13T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-14T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-01-15T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-16T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-17T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-18T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-19T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-20T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-21T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-01-22T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-23T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-24T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-25T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-26T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-27T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-28T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-01-29T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-30T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-01-31T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-01T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-02T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-03T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-04T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ]
        ]);

        expect(getMonthCalendar(new Date('2024-02-01T00:00:00'), [], new Date('2024-02-04T00:00:00'))).toEqual([
            [
                { date: new Date("2024-01-29T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-01-30T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-01-31T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-02-01T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-02-02T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-02-03T03:00:00.000Z"), isLocalized: false, isPast: true, isToday: false },
                { date: new Date("2024-02-04T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: true }
            ], [
                { date: new Date("2024-02-05T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-06T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-07T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-08T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-09T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-10T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-11T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-02-12T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-13T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-14T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-15T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-16T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-17T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-18T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-02-19T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-20T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-21T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-22T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-23T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-24T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-25T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ], [
                { date: new Date("2024-02-26T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-27T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-28T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-02-29T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-03-01T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-03-02T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false },
                { date: new Date("2024-03-03T03:00:00.000Z"), isLocalized: false, isPast: false, isToday: false }
            ]
        ]);
    });
});