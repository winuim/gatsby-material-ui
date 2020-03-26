import React from "react";
import Calendar from "react-calendar";
import "../../styles/Calendar.css";
import { format } from "date-fns";

import Title from "./Title";
import { isHoliday } from "./HolidayModel";
import { UserWorkingDaysProps, filterWorking } from "./UserModel";
import { WorkSiteProps, findWorkSite, getWorkSiteInfo } from "./WorkSiteModel";

type ViewType = "month" | "year" | "decade" | "century";

interface TileProps {
  date: Date;
  view: ViewType;
}

interface Props {
  value: Date;
  handleOnClickDay: (value: Date) => void;
  workingDayModels: Array<UserWorkingDaysProps>;
  workSiteModels: Array<WorkSiteProps>;
}

export default function MyCalendar(props: Props): JSX.Element {
  const tileClassName = ({ date, view }: TileProps): string => {
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
  const tileContent = ({ date, view }: TileProps): JSX.Element => {
    if (view != "month") {
      return <p>{"  "}</p>;
    }
    const day = format(date, "yyyy-MM-dd");
    const workingDayModels = filterWorking(day, props.workingDayModels);
    if (workingDayModels.length > 0) {
      return (
        <p>
          {workingDayModels.map((v) => {
            const workSiteModel = findWorkSite(
              v.workSiteId,
              props.workSiteModels
            );
            if (workSiteModel) {
              const workSiteInfo = getWorkSiteInfo(day, workSiteModel);
              return workSiteInfo.workSiteName;
            }
            return "error";
          })}
        </p>
      );
    }
    return <p>{"  "}</p>;
  };

  return (
    <React.Fragment>
      <Title>カレンダー</Title>
      <Calendar
        locale="ja-JP"
        calendarType="US"
        onClickDay={props.handleOnClickDay}
        value={props.value}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />
    </React.Fragment>
  );
}
