import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";

import { WorkReportProps, filterWorking } from "../../models/EmployeeModel";
import {
  WorkSiteProps,
  WorkSiteInfoProps,
  InitialWorkSiteInfo,
  findWorkSites,
  getWorkSiteInfo,
} from "../../models/WorkSitesModel";

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
  })
);

interface Props {
  value: Date;
  workReportModels: Array<WorkReportProps>;
  workSiteModels: Array<WorkSiteProps>;
}

export default function MyTaskCard(props: Props): JSX.Element {
  const classes = useStyles();
  let workSiteInfo: (WorkSiteInfoProps | undefined)[] = [InitialWorkSiteInfo];
  let selectedWorkSiteModels: (WorkSiteProps | undefined)[] = [];
  const day = format(props.value, "yyyy-MM-dd");
  const selectedworkReportModels = filterWorking(day, props.workReportModels);
  if (selectedworkReportModels.length > 0) {
    selectedWorkSiteModels = selectedworkReportModels.map((v) => {
      return findWorkSites(v.workSiteId, props.workSiteModels);
    });
    workSiteInfo = selectedWorkSiteModels.map((v) => {
      if (v) {
        return getWorkSiteInfo(day, v);
      }
    });
  }

  return (
    <React.Fragment>
      {workSiteInfo.map((element, index) => (
        <div key={index}>
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
                準備開始、出発連絡は: {element ? element.contactWorkStart : "*"}
              </Typography>
              <Typography variant="body2" component="p">
                到着連絡、業務開始連絡は:{" "}
                {element ? element.constactWorkEnd : "*"}
              </Typography>
              <Typography variant="body2" component="p">
                スタッフ: {element ? element.staff : "*"}
              </Typography>
            </CardContent>
          </Card>
          <br />
        </div>
      ))}
    </React.Fragment>
  );
}
