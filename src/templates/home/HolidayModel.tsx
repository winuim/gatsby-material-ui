import { format } from "date-fns";

interface HolidaysModelProps {
  [index: string]: {
    isHoliday: boolean;
  };
}

export const HolidaysModel: HolidaysModelProps = {
  "2020-03-20": { isHoliday: true },
};

export function isHoliday(date: Date): boolean {
  const day = format(date, "yyyy-MM-dd");
  return HolidaysModel[day] && HolidaysModel[day].isHoliday ? true : false;
}
