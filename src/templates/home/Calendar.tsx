import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

import Title from "./Title";
import { isHoliday } from "./HolidayModel";
import { WorkingDays } from "./UserModel";
import { getWorkSiteInfo } from "./WorkSiteModel";

type ViewType = "month" | "year" | "decade" | "century";

interface TileProps {
  date: Date;
  view: ViewType;
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 450,
  },
}));

interface Props {
  value: Date;
  handleOnClickDay: (value: Date) => void;
}

export default function MyCalendar(props: Props): JSX.Element {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
    if (WorkingDays[day]) {
      const workday = WorkingDays[day];
      return (
        <p>
          {workday.map(v => {
            const workSiteInfo = getWorkSiteInfo(v.workSiteId);
            if (workSiteInfo) {
              return workSiteInfo.workSiteName;
            }
            return "取得失敗";
          })}
        </p>
      );
    }
    return <p>{"  "}</p>;
  };

  return (
    <React.Fragment>
      <Paper className={fixedHeightPaper}>
        <Title>Calendar</Title>
        <Calendar
          locale="ja-JP"
          calendarType="US"
          onClickDay={props.handleOnClickDay}
          value={props.value}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </Paper>
    </React.Fragment>
  );
}
