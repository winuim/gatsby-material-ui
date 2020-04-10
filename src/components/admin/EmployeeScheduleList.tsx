import React, { useState } from "react";
import MaterialTable, { Column } from "material-table";
import { EmployeeScheduleProps } from "../../models/EmployeeModel";
import { endOfMonth, parse } from "date-fns/esm";
import { addDays, format } from "date-fns";

interface TableState {
  columns: Array<Column<EmployeeScheduleProps>>;
  data: EmployeeScheduleProps[];
}

interface Props {
  data: EmployeeScheduleProps[];
}

export default function EmployeeScheduleList(props: Props) {
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
    <div>
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
    </div>
  );
}
