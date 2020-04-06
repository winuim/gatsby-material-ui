import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "@reach/router";
import { format } from "date-fns";

import ReactCalendar, { CalendarTileProps } from "../../components/Calendar";
import Layout, { useStyles } from "./Layout";
import MyTaskCard from "./TaskCard";
import MyBacklog from "./Backlog";
import MyTodo from "./Todo";
import MySchedule from "./Schedule";
import MyProfile from "./Profile";

import {
  MyProfileModel,
  MyWorkingDayModels,
  filterWorking,
} from "../../model/UserModel";
import {
  WorkSiteModels,
  findWorkSite,
  getWorkSiteInfo,
} from "../../model/WorkSiteModel";

export default function Mypage(): JSX.Element {
  const location = useLocation();
  const classes = useStyles();
  const [selected, setSelected] = useState(new Date());
  const handleOnClickDay = (value: Date): void => {
    console.debug(`handleOnClick(${value})`);
    setSelected(value);
  };
  const tileContent = ({ date, view }: CalendarTileProps): JSX.Element => {
    if (view != "month") {
      return <p>{"  "}</p>;
    }
    const day = format(date, "yyyy-MM-dd");
    const workingDayModels = filterWorking(day, MyWorkingDayModels);
    if (workingDayModels.length > 0) {
      return (
        <p>
          {workingDayModels.map((v) => {
            const workSiteModel = findWorkSite(v.workSiteId, WorkSiteModels);
            if (workSiteModel) {
              const workSiteInfo = getWorkSiteInfo(day, workSiteModel);
              return workSiteInfo.workSiteName;
            }
            return "error";
          })}
        </p>
      );
    }
    return <p>{"  "}</p>;
  };

  return (
    <Layout>
      {location.hash === "" && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} lg={5}>
            <Paper className={classes.paper}>
              <ReactCalendar
                value={selected}
                title="カレンダー"
                tileContent={tileContent}
                handleOnClickDay={handleOnClickDay}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={7}>
            <Paper className={classes.paper}>
              <MyTaskCard
                value={selected}
                workReportModels={MyWorkingDayModels}
                workSiteModels={WorkSiteModels}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MyBacklog
                workReportModels={MyWorkingDayModels}
                workSiteModels={WorkSiteModels}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      {location.hash === "#todo" && (
        <MyTodo
          value={new Date()}
          workReportModels={MyWorkingDayModels}
          workSiteModels={WorkSiteModels}
        />
      )}
      {location.hash === "#schedule" && <MySchedule />}
      {location.hash === "#profile" && <MyProfile user={MyProfileModel} />}
    </Layout>
  );
}
