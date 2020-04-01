import React from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";

import Title from "./Title";
import { isHoliday } from "./HolidayModel";

export type CalendarViewType = "month" | "year" | "decade" | "century";

export interface CalendarTileProps {
  date: Date;
  view: CalendarViewType;
}

export interface CalendarProps {
  value: Date;
  title: string;
  tileContent: ({ date, view }: CalendarTileProps) => JSX.Element;
  handleOnClickDay: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function MyCalendar(props: CalendarProps): JSX.Element {
  const tileClassName = ({ date, view }: CalendarTileProps): string => {
    if (view != "month") {
      return "";
    }
    if (date.getDay() === 0) {
      return "sunday";
    } else if (date.getDay() === 6) {
      return "saturday";
    }
    return isHoliday(date) ? "holiday" : "";
  };

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Calendar
        locale="ja-JP"
        calendarType="US"
        onClickDay={props.handleOnClickDay}
        value={props.value}
        tileClassName={tileClassName}
        tileContent={props.tileContent}
        minDate={props.minDate}
        maxDate={props.maxDate}
      />
    </React.Fragment>
  );
}
