import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { format, startOfDay } from "date-fns";
import jaLocale from "date-fns/locale/ja";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import { UserWorkingDaysProps, filterWorking } from "./UserModel";
import {
  WorkSiteProps,
  WorkSiteInfoProps,
  InitialWorkSiteInfo,
  findWorkSite,
  getWorkSiteInfo,
} from "./WorkSiteModel";

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
  })
);

interface Props {
  value: Date;
  workingDayModels: Array<UserWorkingDaysProps>;
  workSiteModels: Array<WorkSiteProps>;
}

interface DateProps {
  prepareTime: MaterialUiPickersDate;
  departureTime: MaterialUiPickersDate;
  arrivalTime: MaterialUiPickersDate;
  workStartTime: MaterialUiPickersDate;
  workEndTime: MaterialUiPickersDate;
  breakTime: MaterialUiPickersDate;
}

export default function MyTodo(props: Props): JSX.Element {
  const classes = useStyles();
  let workSiteInfo: (WorkSiteInfoProps | undefined)[] = [InitialWorkSiteInfo];
  let selectedWorkSiteModels: (WorkSiteProps | undefined)[] = [];
  const day = format(props.value, "yyyy-MM-dd");
  const selectedWorkingDayModels = filterWorking(day, props.workingDayModels);
  if (selectedWorkingDayModels.length > 0) {
    selectedWorkSiteModels = selectedWorkingDayModels.map((v) => {
      return findWorkSite(v.workSiteId, props.workSiteModels);
    });
    workSiteInfo = selectedWorkSiteModels.map((v) => {
      if (v) {
        return getWorkSiteInfo(day, v);
      }
    });
  }
  const today = new Date();
  const initialDate: DateProps = {
    prepareTime: today,
    departureTime: today,
    arrivalTime: today,
    workStartTime: today,
    workEndTime: today,
    breakTime: startOfDay(today),
  };
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const handleDateChange = (changeDate: Partial<DateProps>, index: number) => {
    console.log(changeDate);
    const updateDate: DateProps = {
      prepareTime: changeDate.prepareTime
        ? changeDate.prepareTime
        : selectedDate.prepareTime,
      departureTime: changeDate.departureTime
        ? changeDate.departureTime
        : selectedDate.departureTime,
      arrivalTime: changeDate.arrivalTime
        ? changeDate.arrivalTime
        : selectedDate.arrivalTime,
      workStartTime: changeDate.workStartTime
        ? changeDate.workStartTime
        : selectedDate.workStartTime,
      workEndTime: changeDate.workEndTime
        ? changeDate.workEndTime
        : selectedDate.workEndTime,
      breakTime: changeDate.breakTime
        ? changeDate.breakTime
        : selectedDate.breakTime,
    };
    setSelectedDate(updateDate);
  };

  return (
    <Grid container spacing={3}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
        {workSiteInfo.map((element, index) => (
          <Grid item xs={12} key={index}>
            <Paper className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {day}のお仕事
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {element ? element.workSiteName : "現場はありません"}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    業務予定時間: {element ? element.workTime : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    集合場所: {element ? element.meetingPlace : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    集合時間: {element ? element.meetingHours : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    服装: {element ? element.clothes : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    持ち物: {element ? element.items : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    特記事項: {element ? element.remarks : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    準備開始、出発連絡は:{" "}
                    {element ? element.contactWorkStart : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    到着連絡、業務開始連絡は:{" "}
                    {element ? element.constactWorkEnd : "*"}
                  </Typography>
                  <Typography variant="body2" component="p">
                    スタッフ: {element ? element.staff : "*"}
                  </Typography>
                  <div>
                    <TimePicker
                      label="準備開始"
                      value={selectedDate.prepareTime}
                      onChange={(date) =>
                        handleDateChange({ prepareTime: date }, index)
                      }
                      minutesStep={5}
                    />
                    <TimePicker
                      label="出発"
                      value={selectedDate.departureTime}
                      onChange={(date) =>
                        handleDateChange({ departureTime: date }, index)
                      }
                      minutesStep={5}
                    />
                    <TimePicker
                      label="到着"
                      value={selectedDate.arrivalTime}
                      onChange={(date) =>
                        handleDateChange({ arrivalTime: date }, index)
                      }
                      minutesStep={5}
                    />
                    <TimePicker
                      label="業務開始"
                      value={selectedDate.workStartTime}
                      onChange={(date) =>
                        handleDateChange({ workStartTime: date }, index)
                      }
                      minutesStep={5}
                    />
                    <TimePicker
                      label="業務終了"
                      value={selectedDate.workEndTime}
                      onChange={(date) =>
                        handleDateChange({ workEndTime: date }, index)
                      }
                      minutesStep={5}
                    />
                    <TimePicker
                      label="休憩時間"
                      ampm={false}
                      value={selectedDate.breakTime}
                      onChange={(date) =>
                        handleDateChange({ breakTime: date }, index)
                      }
                      minutesStep={5}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="save">
                    <SaveIcon />
                  </IconButton>
                  <IconButton aria-label="send mail">
                    <EmailIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
