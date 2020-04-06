import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { isAfter, parse, subDays } from "date-fns";

import Title from "../Title";
import { WorkReportProps } from "../../model/EmployeeModel";
import {
  WorkSiteProps,
  WorkSiteInfoProps,
  findWorkSites,
  getWorkSiteInfo,
} from "../../model/WorkSitesModel";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

interface Props {
  workReportModels: Array<WorkReportProps>;
  workSiteModels: Array<WorkSiteProps>;
}

export default function MyBacklog(props: Props): JSX.Element {
  const classes = useStyles();
  const rows: Array<WorkSiteInfoProps> = [];
  const today = new Date();
  if (props.workReportModels) {
    props.workReportModels.forEach((value) => {
      if (
        isAfter(
          parse(value.workDate, "yyyy-MM-dd", new Date()),
          subDays(today, 1)
        )
      ) {
        const workSiteInfo = findWorkSites(
          value.workSiteId,
          props.workSiteModels
        );
        if (workSiteInfo) {
          const data = getWorkSiteInfo(value.workDate, workSiteInfo);
          rows.push(data);
        }
      }
    });
  }

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
            <TableCell>服装</TableCell>
            <TableCell>持ち物</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(0, 10).map((row) => (
            <TableRow key={row.workSiteId + "-" + row.workDate}>
              <TableCell>{row.workDate}</TableCell>
              <TableCell>{row.workSiteName}</TableCell>
              <TableCell>{row.workTime}</TableCell>
              <TableCell>{row.meetingPlace}</TableCell>
              <TableCell>{row.meetingHours}</TableCell>
              <TableCell>{row.clothes}</TableCell>
              <TableCell>{row.items}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
