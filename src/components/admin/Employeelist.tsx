import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";
import { ProfileModel } from "../../model/EmployeeModel";

interface TableState {
  columns: Array<Column<ProfileModel>>;
  data: ProfileModel[];
}

interface Props {
  data: ProfileModel[];
}

export default function Employeelist(props: Props) {
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
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
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
    </div>
  );
}
