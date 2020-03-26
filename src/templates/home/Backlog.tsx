import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { isAfter, parse } from "date-fns";

import Title from "./Title";
import { UserWorkingDaysProps } from "./UserModel";
import {
  WorkSiteProps,
  WorkSiteInfoProps,
  findWorkSite,
  getWorkSiteInfo,
} from "./WorkSiteModel";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

interface Props {
  workingDayModels: Array<UserWorkingDaysProps>;
  workSiteModels: Array<WorkSiteProps>;
}

export default function MyBacklog(props: Props) {
  const classes = useStyles();
  const rows: Array<WorkSiteInfoProps> = [];
  const today = new Date();
  props.workingDayModels.forEach((value) => {
    if (isAfter(parse(value.date, "yyyy-MM-dd", new Date()), today)) {
      const workSiteInfo = findWorkSite(value.workSiteId, props.workSiteModels);
      if (workSiteInfo) {
        const data = getWorkSiteInfo(value.date, workSiteInfo);
        rows.push(data);
      }
    }
  });

  return (
    <React.Fragment>
      <Title>直近のお仕事一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>現場名</TableCell>
            <TableCell>業務予定時間</TableCell>
            <TableCell>集合場所</TableCell>
            <TableCell>集合時間</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.workSiteId + "-" + row.workDate}>
              <TableCell>{row.workDate}</TableCell>
              <TableCell>{row.workSiteName}</TableCell>
              <TableCell>{row.workTime}</TableCell>
              <TableCell>{row.meetingPlace}</TableCell>
              <TableCell>{row.meetingHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          もっと見る
        </Link>
      </div>
    </React.Fragment>
  );
}
