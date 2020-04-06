import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import { format, addDays, addMonths, endOfMonth } from "date-fns";

import ReactCalendar, { CalendarTileProps } from "../../components/Calendar";
import { UserAvailableDayProps } from "../../model/UserModel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

function getFormatMonth(value: Date): string {
  return format(value, "yyyy-MM");
}

function getFormatDate(value: Date): string {
  return format(value, "yyyy-MM-dd");
}

function initUserAvailableDays(
  minDate: Date,
  maxDate: Date
): UserAvailableDayProps {
  const userAvailableDays: UserAvailableDayProps = {};
  const minDateMonth = getFormatMonth(minDate);
  const maxDateMonth = getFormatMonth(maxDate);
  userAvailableDays[minDateMonth] = {};
  userAvailableDays[maxDateMonth] = {};
  return userAvailableDays;
}

function getUserAvailableDaysChar(
  userAvailableDays: UserAvailableDayProps,
  date: Date
): string {
  const month = getFormatMonth(date);
  const day = getFormatDate(date);
  if (userAvailableDays[month]) {
    if (userAvailableDays[month][day]) {
      switch (userAvailableDays[month][day].available) {
        case 1: {
          return "○";
        }
        case 2: {
          return "△";
        }
        case 3: {
          return "X";
        }
        default: {
          return "  ";
        }
      }
    }
  }
  return "  ";
}

function incrUserAvailableDaysChar(
  userAvailableDays: UserAvailableDayProps,
  date: Date
): UserAvailableDayProps {
  const month = getFormatMonth(date);
  const day = getFormatDate(date);
  if (!userAvailableDays[month]) {
    userAvailableDays[month] = {};
  }
  if (!userAvailableDays[month][day]) {
    userAvailableDays[month][day] = {
      available: 0,
    };
  }
  if (userAvailableDays[month][day]) {
    let available = userAvailableDays[month][day].available + 1;
    if (available > 3) {
      available = 1;
    }
    userAvailableDays[month][day].available = available;
  }
  console.log(
    `incrUserAvailableDaysChar ${day}:${JSON.stringify(
      userAvailableDays[month][day]
    )}`
  );
  return userAvailableDays;
}

function getUserAvailableDaysStr(
  userAvailableDays: UserAvailableDayProps,
  available: number
): string[] {
  const result: string[] = [];
  for (const month in userAvailableDays) {
    for (const day in userAvailableDays[month]) {
      const dayData = userAvailableDays[month][day];
      if (dayData.available === available) {
        result.push(day.substr(5, 5));
      }
    }
  }
  return result;
}

export default function MySchedule() {
  const classes = useStyles();
  const minDate = addDays(new Date(), 7);
  const maxDate = endOfMonth(addMonths(new Date(), 1));
  const [selected, setSelected] = useState({
    date: new Date(),
    userAvailableDays: initUserAvailableDays(minDate, maxDate),
  });

  const tileContent = ({ date, view }: CalendarTileProps): JSX.Element => {
    if (view != "month") {
      return <p>{"  "}</p>;
    }
    const userAvailableDays = selected.userAvailableDays;
    return <p>{getUserAvailableDaysChar(userAvailableDays, date)}</p>;
  };
  const handleOnClickDay = (value: Date): void => {
    console.debug(`handleOnClick(${value})`);
    const userAvailableDays = incrUserAvailableDaysChar(
      selected.userAvailableDays,
      value
    );
    setSelected({
      date: value,
      userAvailableDays: userAvailableDays,
    });
  };
  const handleScheduleMail = (): void => {
    const subject: string = encodeURIComponent("スケジュール提出 ○○○○");
    const bodyMain = [
      "お疲れ様です。",
      "○ (空いてます): " +
        getUserAvailableDaysStr(selected.userAvailableDays, 1).join(", "),
      "X (空いてません): " +
        getUserAvailableDaysStr(selected.userAvailableDays, 3).join(", "),
      "△ (未定): " +
        getUserAvailableDaysStr(selected.userAvailableDays, 2).join(", "),
      "よろしくお願いします。",
    ];
    const body: string = encodeURIComponent(bodyMain.join("\n"));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.paper}>
            <ReactCalendar
              value={selected.date}
              title="スケジュール登録"
              tileContent={tileContent}
              handleOnClickDay={handleOnClickDay}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {getFormatDate(minDate)}〜{getFormatDate(maxDate)}
                  のスケジュール
                </Typography>
                <Typography variant="body2" component="p">
                  ○ (空いてます):{" "}
                  {getUserAvailableDaysStr(selected.userAvailableDays, 1).join(
                    ", "
                  )}
                </Typography>
                <Typography variant="body2" component="p">
                  X (空いてません):{" "}
                  {getUserAvailableDaysStr(selected.userAvailableDays, 3).join(
                    ", "
                  )}
                </Typography>
                <Typography variant="body2" component="p">
                  △ (未定):{" "}
                  {getUserAvailableDaysStr(selected.userAvailableDays, 2).join(
                    ", "
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  保存
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<SendIcon />}
                  onClick={handleScheduleMail}
                >
                  スケジュール提出メール送信
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
