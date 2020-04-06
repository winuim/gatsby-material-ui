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
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { format, parse } from "date-fns";
import jaLocale from "date-fns/locale/ja";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  UserWorkReportProps,
  RequiredUserWorkReportProps,
  filterWorking,
} from "../../model/UserModel";
import {
  WorkSiteProps,
  findWorkSite,
  getWorkSiteInfo,
} from "../../model/WorkSiteModel";

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
  workReportModels: Array<UserWorkReportProps>;
  workSiteModels: Array<WorkSiteProps>;
}

export default function MyTodo(props: Props): JSX.Element {
  const classes = useStyles();
  let workSiteInfoDisabled = true;
  let selectedWorkSiteModels: WorkSiteProps[] = [];
  const selectedDay = format(props.value, "yyyy-MM-dd");
  const selectedworkReportModels = filterWorking(
    selectedDay,
    props.workReportModels
  );
  if (selectedworkReportModels.length > 0) {
    workSiteInfoDisabled = false;
    selectedWorkSiteModels = selectedworkReportModels.map((value) => {
      return findWorkSite(value.workSiteId, props.workSiteModels);
    });
  }
  const now = new Date();
  const initialDate: RequiredUserWorkReportProps[] = selectedWorkSiteModels.map(
    (val) => {
      const workDateTime = parse(
        selectedDay + " " + now.getHours() + ":" + now.getMinutes(),
        "yyyy-MM-dd HH:mm",
        new Date()
      );
      return {
        workSiteId: val.workSiteId,
        workDate: selectedDay,
        prepareTime: workDateTime,
        departureTime: workDateTime,
        trainDepartureTime: workDateTime,
        arrivalTime: workDateTime,
        workStartTime: workDateTime,
        workEndTime: workDateTime,
        breakTime: 60,
        expenses: 0,
        section: "",
        report: "",
      };
    }
  );
  const [SelectedData, setSelectedData] = useState(initialDate);
  const handleDataChange = (
    changeData: Partial<RequiredUserWorkReportProps>,
    index: number
  ): void => {
    console.log(JSON.stringify(changeData) + ", " + index);
    const updateDate = SelectedData.slice(0);
    if (changeData.prepareTime) {
      updateDate[index].prepareTime = changeData.prepareTime;
    }
    if (changeData.departureTime) {
      updateDate[index].departureTime = changeData.departureTime;
    }
    if (changeData.trainDepartureTime) {
      updateDate[index].trainDepartureTime = changeData.trainDepartureTime;
    }
    if (changeData.arrivalTime) {
      updateDate[index].arrivalTime = changeData.arrivalTime;
    }
    if (changeData.workStartTime) {
      updateDate[index].workStartTime = changeData.workStartTime;
    }
    if (changeData.workEndTime) {
      updateDate[index].workEndTime = changeData.workEndTime;
    }
    if (changeData.breakTime) {
      updateDate[index].breakTime = changeData.breakTime;
    }
    if (changeData.expenses) {
      updateDate[index].expenses = changeData.expenses;
    }
    if (changeData.section) {
      updateDate[index].section = changeData.section;
    }
    if (changeData.report) {
      updateDate[index].report = changeData.report;
    }
    setSelectedData(updateDate);
  };
  const handlePrepareMail = (index: number): void => {
    const nowTime = format(SelectedData[index].prepareTime as Date, "HH:mm");
    const subject: string = encodeURIComponent("準備開始報告 ○○○○ " + nowTime);
    const body: string = encodeURIComponent(
      "おはようございます。\n今から準備開始します。\n"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const handleDepartureMail = (index: number): void => {
    const nowTime = format(SelectedData[index].departureTime as Date, "HH:mm");
    const subject: string = encodeURIComponent("出発報告 ○○○○ " + nowTime);
    const body: string = encodeURIComponent(
      "お疲れ様です。\n今から出発します。\nよろしくお願いします。\n"
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };
  const handleReportMail = (index: number): void => {
    const subject: string = encodeURIComponent("就業報告 ○○○○ ");
    const bodyMain = [
      "お疲れさまです",
      "本日の就業報告です。",
      "",
      "【氏名】○○　○○",
      "【日付】" + selectedDay,
      "【現場名】" + selectedWorkSiteModels[index].workSiteName,
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
        {selectedWorkSiteModels.map((val, index) => {
          const workSiteInfo = getWorkSiteInfo(selectedDay, val);
          return (
            <Grid item xs={12} key={index}>
              <Paper className={classes.paper}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {selectedDay}の現場
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {workSiteInfo.workSiteName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      業務予定時間: {workSiteInfo.workTime}
                    </Typography>
                    <Typography variant="body2" component="p">
                      集合場所: {workSiteInfo.meetingPlace}
                    </Typography>
                    <Typography variant="body2" component="p">
                      集合時間: {workSiteInfo.meetingHours}
                    </Typography>
                    <Typography variant="body2" component="p">
                      服装: {workSiteInfo.clothes}
                    </Typography>
                    <Typography variant="body2" component="p">
                      持ち物: {workSiteInfo.items}
                    </Typography>
                    <Typography variant="body2" component="p">
                      特記事項: {workSiteInfo.remarks}
                    </Typography>
                    <Typography variant="body2" component="p">
                      準備開始、出発連絡は:{workSiteInfo.contactWorkStart}
                    </Typography>
                    <Typography variant="body2" component="p">
                      到着連絡、業務開始連絡は:{workSiteInfo.constactWorkEnd}
                    </Typography>
                    <Typography variant="body2" component="p">
                      スタッフ: {workSiteInfo.staff}
                    </Typography>
                    <br />
                    <div>
                      <TimePicker
                        label="準備開始"
                        value={SelectedData[index].prepareTime}
                        onChange={(date): void =>
                          handleDataChange({ prepareTime: date as Date }, index)
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
                        onClick={(): void => handlePrepareMail(index)}
                        disabled={workSiteInfoDisabled}
                      >
                        準備開始メール連絡
                      </Button>
                    </div>
                    <div>
                      <TimePicker
                        label="出発"
                        value={SelectedData[index].departureTime}
                        onChange={(date): void =>
                          handleDataChange(
                            { departureTime: date as Date },
                            index
                          )
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
                        onClick={(): void => handleDepartureMail(index)}
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
                        onChange={(date): void =>
                          handleDataChange(
                            { trainDepartureTime: date as Date },
                            index
                          )
                        }
                        showTodayButton={true}
                        todayLabel="現在時刻"
                        disabled={workSiteInfoDisabled}
                      />
                      <TimePicker
                        label="集合時間"
                        value={SelectedData[index].arrivalTime}
                        onChange={(date): void =>
                          handleDataChange({ arrivalTime: date as Date }, index)
                        }
                        showTodayButton={true}
                        todayLabel="現在時刻"
                        disabled={workSiteInfoDisabled}
                      />
                      <TimePicker
                        label="開始時間"
                        value={SelectedData[index].workStartTime}
                        onChange={(date): void =>
                          handleDataChange(
                            { workStartTime: date as Date },
                            index
                          )
                        }
                        showTodayButton={true}
                        todayLabel="現在時刻"
                        disabled={workSiteInfoDisabled}
                      />
                      <TimePicker
                        label="終了時間"
                        value={SelectedData[index].workEndTime}
                        onChange={(date): void =>
                          handleDataChange({ workEndTime: date as Date }, index)
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
                        onChange={(e): void =>
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
                          onChange={(e): void =>
                            handleDataChange(
                              { expenses: parseInt(e.target.value) },
                              index
                            )
                          }
                          disabled={workSiteInfoDisabled}
                        />
                        <TextField
                          label="区間"
                          onChange={(e): void =>
                            handleDataChange({ section: e.target.value }, index)
                          }
                          disabled={workSiteInfoDisabled}
                        />
                      </div>
                      <TextField
                        label="報告事項"
                        multiline
                        rows="4"
                        onChange={(e): void =>
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
                      onClick={(): void => handleReportMail(index)}
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
                      申請
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      disabled={workSiteInfoDisabled}
                    >
                      引き戻し
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          );
        })}
      </MuiPickersUtilsProvider>
    </Grid>
  );
}
