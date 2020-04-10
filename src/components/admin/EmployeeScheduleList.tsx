import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { addDays, format, differenceInDays } from "date-fns";
import jaLocale from "date-fns/locale/ja";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";

import { EmployeeScheduleProps } from "../../models/EmployeeModel";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
    },
  },
}));

interface Props {
  data: EmployeeScheduleProps[];
}

interface ScheduleDateProps {
  startDate: Date;
  endDate: Date;
  columns: MUIDataTableColumn[];
  data: EmployeeScheduleProps[];
}
type PartialScheduleDateProps = Partial<ScheduleDateProps>;

function getColumns(startDate: Date, endDate: Date): MUIDataTableColumn[] {
  const columns: MUIDataTableColumn[] = [];
  for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
    columns.push({
      label: format(d, "MM/dd"),
      name: format(d, "yyyy-MM-dd"),
    });
  }
  return columns;
}

export default function EmployeeScheduleList(props: Props): JSX.Element {
  const classes = useStyles();
  const today = new Date();
  const endDate = addDays(today, 15);
  const initColumns: MUIDataTableColumn[] = [
    {
      name: "userId",
      label: "従業員ID",
      options: {
        display: "false",
      },
    },
    { name: "userName", label: "従業員名" },
  ];
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    selectableRows: "none",
    downloadOptions: {
      filename: "employeeScheduleList.csv",
    },
  };
  const [selectedDate, handleDateChange] = useState<ScheduleDateProps>({
    startDate: today,
    endDate: endDate,
    columns: initColumns.concat(getColumns(today, endDate)),
    data: props.data,
  });
  const handleOnClickDay = (value: PartialScheduleDateProps): void => {
    console.debug(`handleOnClick(${JSON.stringify(value)})`);
    const startDate = value.startDate
      ? value.startDate
      : selectedDate.startDate;
    let endDate = value.endDate ? value.endDate : selectedDate.endDate;
    const initColumns = selectedDate.columns.slice(0, 2);
    const data = selectedDate.data;
    if (startDate.getTime() > endDate.getTime()) {
      endDate = addDays(
        startDate,
        differenceInDays(selectedDate.endDate, selectedDate.startDate)
      );
    }
    handleDateChange({
      startDate: startDate,
      endDate: endDate,
      columns: initColumns.concat(getColumns(startDate, endDate)),
      data: data,
    });
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={jaLocale}>
            <Grid item xs={3}>
              <DatePicker
                label="表示開始日"
                value={selectedDate.startDate}
                onChange={(value): void => {
                  handleOnClickDay({ startDate: value as Date });
                }}
                showTodayButton={true}
              />
            </Grid>
            <Grid item xs={3}>
              <DatePicker
                label="表示終了日"
                value={selectedDate.endDate}
                onChange={(value): void => {
                  handleOnClickDay({ endDate: value as Date });
                }}
                showTodayButton={true}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item xs={12}>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <MUIDataTable
              title={"従業員提出スケジュール"}
              columns={selectedDate.columns}
              data={selectedDate.data}
              options={options}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
