import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";

import { ProfileModelProps } from "../../models/EmployeeModel";

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
  data: ProfileModelProps[];
}

export default function EmployeeList(props: Props) {
  const classes = useStyles();
  const columns: MUIDataTableColumn[] = [
    { name: "userId", label: "従業員ID" },
    { name: "email", label: "E-mail" },
    { name: "lastName", label: "姓" },
    { name: "firstName", label: "名" },
    { name: "lastKana", label: "カナ(姓)" },
    { name: "firstKana", label: "カナ(名)" },
    { name: "displayName", label: "表示名" },
  ];

  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    selectableRows: "none",
    downloadOptions: {
      filename: "employeeList.csv",
    },
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <MUIDataTable
          title={"従業員一覧"}
          data={props.data}
          columns={columns}
          options={options}
        />
      </Paper>
    </React.Fragment>
  );
}
