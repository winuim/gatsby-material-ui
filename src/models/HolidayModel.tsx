import { format } from "date-fns";
import { HolidaysModel } from "./dummyModels";

export interface HolidaysModelProps {
  [index: string]: {
    isHoliday: boolean;
  };
}

export function isHoliday(date: Date): boolean {
  const day = format(date, "yyyy-MM-dd");
  return HolidaysModel[day] && HolidaysModel[day].isHoliday ? true : false;
}
