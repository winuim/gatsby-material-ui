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

interface SelectedProps {
  prepareTime: MaterialUiPickersDate;
  departureTime: MaterialUiPickersDate;
  trainDepartureTime: MaterialUiPickersDate;
  arrivalTime: MaterialUiPickersDate;
  workStartTime: MaterialUiPickersDate;
  workEndTime: MaterialUiPickersDate;
  breakTime: number;
  expenses: number;
  section: string;
  report: string;
}

export default function MyTodo(props: Props): JSX.Element {
  const classes = useStyles();
  let workSiteInfo: (WorkSiteInfoProps | undefined)[] = [InitialWorkSiteInfo];
  let workSiteInfoDisabled = true;
  let selectedWorkSiteModels: (WorkSiteProps | undefined)[] = [];
  const day = format(props.value, "yyyy-MM-dd");
  const selectedWorkingDayModels = filterWorking(day, props.workingDayModels);
  if (selectedWorkingDayModels.length > 0) {
    selectedWorkSiteModels = selectedWorkingDayModels.map((v) => {
      return findWorkSite(v.workSiteId, props.workSiteModels);
    });
    workSiteInfo = selectedWorkSiteModels.map((v) => {
      if (v) {
        workSiteInfoDisabled = false;
        return getWorkSiteInfo(day, v);
      }
    });
  }
  const today = new Date();
  const initialDate: SelectedProps[] = workSiteInfo.map((v) => {
    return {
      prepareTime: today,
      departureTime: today,
      trainDepartureTime: today,
      arrivalTime: today,
      workStartTime: today,
      workEndTime: today,
      breakTime: 60,
      expenses: 0,
      section: "",
      report: "",
    };
  });
  const [SelectedData, setSelectedData] = useState(initialDate);
  const handleDataChange = (
    changeData: Partial<SelectedProps>,
    index: number
  ): void => {
    console.log(JSON.stringify(changeData) + ", " + index);
    const updateDate = SelectedData.slice(0);
    updateDate[index] = {
      prepareTime: changeData.prepareTime
        ? changeData.prepareTime
        : SelectedData[index].prepareTime,
      departureTime: changeData.departureTime
        ? changeData.departureTime
        : SelectedData[index].departureTime,
      trainDepartureTime: changeData.trainDepartureTime
        ? changeData.trainDepartureTime
        : SelectedData[index].trainDepartureTime,
      arrivalTime: changeData.arrivalTime
        ? changeData.arrivalTime
        : SelectedData[index].arrivalTime,
      workStartTime: changeData.workStartTime
        ? changeData.workStartTime
        : SelectedData[index].workStartTime,
      workEndTime: changeData.workEndTime
        ? changeData.workEndTime
        : SelectedData[index].workEndTime,
      breakTime: changeData.breakTime
        ? changeData.breakTime
        : SelectedData[index].breakTime,
      expenses: changeData.expenses
        ? changeData.expenses
        : SelectedData[index].expenses,
      section: changeData.section
        ? changeData.section
        : SelectedData[index].section,
      report: changeData.report
        ? changeData.report
        : SelectedData[index].report,
    };
    setSelectedData(updateDate);
  };
  const handlePrepareMail = (index: number) => {
    const nowTime = format(SelectedData[index].prepareTime as Date, "HH:mm");
    const subject: string = encodeURIComponent("準備開始報告 ○○○○ " + nowTime);
    const body: string = encodeURIComponent(
      "おはようございます。\n今から準備開始します。\n"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const handleDepartureMail = (index: number) => {
    const nowTime = format(SelectedData[index].departureTime as Date, "HH:mm");
    const subject: string = encodeURIComponent("出発報告 ○○○○ " + nowTime);
    const body: string = encodeURIComponent(
      "お疲れ様です。\n今から出発します。\nよろしくお願いします。\n"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const handleReportMail = (index: number) => {
    const subject: string = encodeURIComponent("就業報告 ○○○○ ");
    const bodyMain = [
      "お疲れさまです",
      "本日の就業報告です。",
      "",
      "【氏名】○○　○○",
      "【日付】" + workSiteInfo[index]?.workDate,
      "【現場名】" + workSiteInfo[index]?.workSiteName,
      "【勤務時間】" +
        format(SelectedData[index].workStartTime as Date, "HH:mm") +
        " 〜 " +
        format(SelectedData[index].workEndTime as Date, "HH:mm"),
      "【休憩時間】" + SelectedData[index].breakTime,
      "【交通費・往復】" + SelectedData[index].expenses,
      "【公共交通機関利用区間】" + SelectedData[index].section,
      "【公共交通機関利用開始時間】" +
        format(SelectedData[index].trainDepartureTime as Date, "HH:mm"),
      "【報告事項】" + SelectedData[index].report,
    ];
    const body: string = encodeURIComponent(bodyMain.join("\n"));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
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
                      value={SelectedData[index].prepareTime}
                      onChange={(date) =>
                        handleDataChange({ prepareTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                      onClick={() => handlePrepareMail(index)}
                      disabled={workSiteInfoDisabled}
                    >
                      準備開始メール連絡
                    </Button>
                  </div>
                  <div>
                    <TimePicker
                      label="出発"
                      value={SelectedData[index].departureTime}
                      onChange={(date) =>
                        handleDataChange({ departureTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                      onClick={() => handleDepartureMail(index)}
                      disabled={workSiteInfoDisabled}
                    >
                      出発メール連絡
                    </Button>
                  </div>
                  <br />
                  <div>
                    <TimePicker
                      label="公共交通機関利用開始時間"
                      value={SelectedData[index].trainDepartureTime}
                      onChange={(date) =>
                        handleDataChange({ trainDepartureTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <TimePicker
                      label="集合時間"
                      value={SelectedData[index].arrivalTime}
                      onChange={(date) =>
                        handleDataChange({ arrivalTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <TimePicker
                      label="開始時間"
                      value={SelectedData[index].workStartTime}
                      onChange={(date) =>
                        handleDataChange({ workStartTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <TimePicker
                      label="終了時間"
                      value={SelectedData[index].workEndTime}
                      onChange={(date) =>
                        handleDataChange({ workEndTime: date }, index)
                      }
                      showTodayButton={true}
                      todayLabel="現在時刻"
                      disabled={workSiteInfoDisabled}
                    />
                    <TextField
                      label="休憩時間(分)"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      defaultValue={SelectedData[index].breakTime}
                      onChange={(e) =>
                        handleDataChange(
                          { breakTime: parseInt(e.target.value) },
                          index
                        )
                      }
                      disabled={workSiteInfoDisabled}
                    />
                    <div>
                      <TextField
                        label="交通費往復"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) =>
                          handleDataChange(
                            { expenses: parseInt(e.target.value) },
                            index
                          )
                        }
                        disabled={workSiteInfoDisabled}
                      />
                      <TextField
                        label="区間"
                        onChange={(e) =>
                          handleDataChange({ section: e.target.value }, index)
                        }
                        disabled={workSiteInfoDisabled}
                      />
                    </div>
                    <TextField
                      label="報告事項"
                      multiline
                      rows="4"
                      onChange={(e) =>
                        handleDataChange({ report: e.target.value }, index)
                      }
                      disabled={workSiteInfoDisabled}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                    onClick={() => handleReportMail(index)}
                    disabled={workSiteInfoDisabled}
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
                    disabled={workSiteInfoDisabled}
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
