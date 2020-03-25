import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";

import { WorkingDays } from "./UserModel";
import { WorkSiteProps, getWorkSiteInfo } from "./WorkSiteModel";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  value: Date;
}

export default function MyTaskCard(props: Props) {
  const classes = useStyles();
  let workSiteInfo: (WorkSiteProps | undefined)[] = [];
  const day = format(props.value, "yyyy-MM-dd");
  if (WorkingDays[day]) {
    const workday = WorkingDays[day];
    workSiteInfo = workday.map(v => {
      return getWorkSiteInfo(v.workSiteId);
    });
  }

  return (
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
          {workSiteInfo[0] ? workSiteInfo[0].workSiteName : "現場はありません"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          業務予定時間:{" "}
          {workSiteInfo[0] ? workSiteInfo[0].workingStartTime : "*"} 〜{" "}
          {workSiteInfo[0] ? workSiteInfo[0].workingEndTime : "*"}
        </Typography>
        <Typography variant="body2" component="p">
          集合場所: {workSiteInfo[0] ? workSiteInfo[0].meetingPlace : "*"}
          <br />
          集合時間: {workSiteInfo[0] ? workSiteInfo[0].meetingHours : "*"}
          <br />
          服装: {workSiteInfo[0] ? workSiteInfo[0].clothes : "*"}
          <br />
          持ち物: {workSiteInfo[0] ? workSiteInfo[0].bringItem : "*"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">詳細</Button>
      </CardActions>
    </Card>
  );
}
