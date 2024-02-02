import { isDayMayor, isWeekDay, parseHolidays, preventClickDefault } from "./util";

describe("Util functions", () => {
    test('should return the holiday with parsed date if the date is valid', () => {
        /** just test the logic, not types */
        expect(parseHolidays([{ date: 'undefined' }] as any)).toEqual([{ date: 'undefined' }]);

        expect(parseHolidays([{ date: '2024-01-01' }] as any)).toEqual([{ date: '2024-01-01', computedDate: new Date('2024-01-01T00:00:00') }]);
    });

    test('it should return true or false in dates comparison', () => {
        expect(isDayMayor(new Date('2024-01-01T00:00:00'), new Date('2023-01-01T00:00:00'))).toBe(true);

        expect(isDayMayor(new Date('2023-01-01T00:00:00'), new Date('2023-01-01T00:00:00'))).toBe(false);

        expect(isDayMayor(new Date('2023-01-01T00:00:01'), new Date('2023-01-01T00:00:00'))).toBe(false);
    });

    test('check if date is weekday', () => {
        // thursday
        expect(isWeekDay({computedDate: new Date('2024-02-01T00:00:00')} as any)).toBe(true);

        // saturday
        expect(isWeekDay({computedDate: new Date('2024-02-03T00:00:00')} as any)).toBe(false);

        // sunday
        expect(isWeekDay({computedDate: new Date('2024-02-04T00:00:00')} as any)).toBe(false);
    });

    test('should prevent propagation and default of event', () => {
        const event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            otherProp: jest.fn(),
        };
        preventClickDefault(event as any);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(event.otherProp).not.toHaveBeenCalled();
    });
});