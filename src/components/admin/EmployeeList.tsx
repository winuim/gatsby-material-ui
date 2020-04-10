import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MaterialTable, { Column } from "material-table";

import { ProfileModelProps } from "../../models/EmployeeModel";

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
  columns: Array<Column<ProfileModelProps>>;
  data: ProfileModelProps[];
}

interface Props {
  data: ProfileModelProps[];
}

export default function EmployeeList(props: Props) {
  const classes = useStyles();
  const [state, setState] = useState<TableState>({
    columns: [
      { title: "従業員ID", field: "userId" },
      { title: "E-mail", field: "email" },
      { title: "姓", field: "lastName" },
      { title: "名", field: "firstName" },
      { title: "カナ(姓)", field: "lastKana" },
      { title: "カナ(名)", field: "firstKana" },
      { title: "表示名", field: "displayName" },
    ],
    data: props.data,
  });

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Paper className={classes.paper}>
        <MaterialTable
          title="従業員一覧"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
          }}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
          }}
        />
      </Paper>
    </React.Fragment>
  );
}
