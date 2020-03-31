import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
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
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
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

interface Props {
  value: Date;
  workingDayModels: Array<UserWorkingDaysProps>;
  workSiteModels: Array<WorkSiteProps>;
}

interface DateProps {
  prepareTime: MaterialUiPickersDate;
  departureTime: MaterialUiPickersDate;
  trainDepartureTime: MaterialUiPickersDate;
  arrivalTime: MaterialUiPickersDate;
  workStartTime: MaterialUiPickersDate;
  workEndTime: MaterialUiPickersDate;
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
  const initialDate: DateProps[] = workSiteInfo.map((v) => {
    return {
      prepareTime: today,
      departureTime: today,
      trainDepartureTime: today,
      arrivalTime: today,
      workStartTime: today,
      workEndTime: today,
    };
  });
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const handleDateChange = (
    changeDate: Partial<DateProps>,
    index: number
  ): void => {
    console.log(JSON.stringify(changeDate) + ", " + index);
    const updateDate = selectedDate.slice(0);
    updateDate[index] = {
      prepareTime: changeDate.prepareTime
        ? changeDate.prepareTime
        : selectedDate[index].prepareTime,
      departureTime: changeDate.departureTime
        ? changeDate.departureTime
        : selectedDate[index].departureTime,
      trainDepartureTime: changeDate.trainDepartureTime
        ? changeDate.trainDepartureTime
        : selectedDate[index].trainDepartureTime,
      arrivalTime: changeDate.arrivalTime
        ? changeDate.arrivalTime
        : selectedDate[index].arrivalTime,
      workStartTime: changeDate.workStartTime
        ? changeDate.workStartTime
        : selectedDate[index].workStartTime,
      workEndTime: changeDate.workEndTime
        ? changeDate.workEndTime
        : selectedDate[index].workEndTime,
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
                  <br />
                  <div>
                    <TimePicker
                      label="準備開始"
                      value={selectedDate[index].prepareTime}
                      onChange={(date) =>
                        handleDateChange({ prepareTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                    >
                      準備開始メール連絡
                    </Button>
                  </div>
                  <div>
                    <TimePicker
                      label="出発"
                      value={selectedDate[index].departureTime}
                      onChange={(date) =>
                        handleDateChange({ departureTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                    >
                      出発メール連絡
                    </Button>
                  </div>
                  <br />
                  <div>
                    <TimePicker
                      label="公共交通機関利用開始時間"
                      value={selectedDate[index].trainDepartureTime}
                      onChange={(date) =>
                        handleDateChange({ trainDepartureTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <TimePicker
                      label="集合時間"
                      value={selectedDate[index].arrivalTime}
                      onChange={(date) =>
                        handleDateChange({ arrivalTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <TimePicker
                      label="開始時間"
                      value={selectedDate[index].workStartTime}
                      onChange={(date) =>
                        handleDateChange({ workStartTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <TimePicker
                      label="終了時間"
                      value={selectedDate[index].workEndTime}
                      onChange={(date) =>
                        handleDateChange({ workEndTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                    />
                    <TextField
                      id="breakTime"
                      label="休憩時間(分)"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue="60"
                    />
                    <div>
                      <TextField
                        id="transportation-expenses"
                        label="交通費往復"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField id="section" label="区間(A〜B)" />
                    </div>
                    <TextField
                      id="report"
                      label="報告事項"
                      multiline
                      rows="4"
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                  >
                    就業報告メール送信
                  </Button>
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
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
