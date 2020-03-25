import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, addDays, addMonths, endOfMonth } from "date-fns";

import Title from "./Title";

type ViewType = "month" | "year" | "decade" | "century";

interface TileProps {
  date: Date;
  view: ViewType;
}

interface HolidaysProps {
  [index: string]: {
    isHoliday: boolean;
  };
}

interface UserProps {
  [index: string]: boolean;
}

interface WorkdaysProps {
  [index: string]: Array<{
    name: string;
  }>;
}

const holidays: HolidaysProps = {
  "2020-03-20": { isHoliday: true },
};

const workdays: WorkdaysProps = {
  "2020-03-03": [{ name: "ひな祭り" }],
  "2020-03-25": [{ name: "終業式" }],
};

function getFormatDate(value: Date): string {
  return format(value, "yyyy-MM-dd");
  //   return `${value.getFullYear()}-${("0" + (value.getMonth() + 1)).slice(-2)}-${(
  //     "0" + value.getDate()
  //   ).slice(-2)}`;
}

export default function Calendar() {
  const theme = useTheme();
  const [state, setState] = useState({
    value: new Date(),
  });

  const tileClassName = ({ date, view }: TileProps) => {
    if (view != "month") {
      return "";
    }
    if (date.getDay() === 0) {
      return "sunday";
    } else if (date.getDay() === 6) {
      return "saturday";
    }
    const day = getFormatDate(date);
    return holidays[day] && holidays[day].isHoliday ? "holiday" : "";
  };
  const tileContent = ({ date, view }: TileProps) => {
    if (view != "month") {
      return "";
    }
    const day = getFormatDate(date);
    if (workdays[day]) {
      const texts = workdays[day];
      return (
        <p>
          {texts.map(v => {
            return v.name;
          })}
        </p>
      );
    }
    return <p>{"  "}</p>;
  };
  const onChange = (value: Date | Date[], view: ViewType) => {
    console.log(`onChange ${value}`);
    const values: Date[] = Array.isArray(value) ? value : [value];
    values.map(v => {
      const day = getFormatDate(v);
      if (!workdays[day]) {
        workdays[day] = [];
      }
      if (
        workdays[day].some(v => {
          return v.name == "○";
        })
      ) {
        workdays[day].pop();
      } else {
        workdays[day].push({
          name: "○",
        });
      }
      console.log(`onChange ${JSON.stringify(workdays[day])}`);
      setState({ value: v });
    });
  };

  return (
    <React.Fragment>
      <Title>Calendar</Title>
      <ReactCalendar
        locale="ja-JP"
        calendarType="US"
        onChange={onChange}
        value={state.value}
        tileClassName={tileClassName}
        tileContent={tileContent}
        minDate={addDays(new Date(), 1)}
        maxDate={endOfMonth(addMonths(new Date(), 1))}
      />
    </React.Fragment>
  );
}
