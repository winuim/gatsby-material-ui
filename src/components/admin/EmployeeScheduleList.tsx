import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MaterialTable, { Column } from "material-table";
import { endOfMonth, parse } from "date-fns/esm";
import { addDays, format } from "date-fns";

import { EmployeeScheduleProps } from "../../models/EmployeeModel";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

interface TableState {
  columns: Array<Column<EmployeeScheduleProps>>;
  data: EmployeeScheduleProps[];
}

interface Props {
  data: EmployeeScheduleProps[];
}

export default function EmployeeScheduleList(props: Props) {
  const classes = useStyles();

  const month = "2020-04";
  const startDate = parse(month + "-01", "yyyy-MM-dd", new Date());
  const endDate = endOfMonth(startDate);
  const columns: Array<Column<EmployeeScheduleProps>> = [
    { title: "従業員ID", field: "userId" },
  ];
  for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
    columns.push({
      title: format(d, "MM/dd"),
      field: format(d, "yyyy-MM-dd"),
      type: "numeric",
      render: (rowData) => {
        switch (rowData[format(d, "yyyy-MM-dd")]) {
          case 1: {
            return "○";
          }
          case 2: {
            return "△";
          }
          case 3: {
            return "×";
          }
          default: {
            return "";
          }
        }
      },
    });
  }

  const [state, setState] = useState<TableState>({
    columns: columns,
    data: props.data,
  });

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="従業員スケジュール"
          columns={state.columns}
          data={state.data}
          options={{
            exportButton: true,
          }}
        />
      </Paper>
    </React.Fragment>
  );
}
