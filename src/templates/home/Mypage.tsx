import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "@reach/router";

import Layout, { useStyles } from "./Layout";
import MyCalendar from "./Calendar";
import MyTaskCard from "./TaskCard";
import MyBacklog from "./Backlog";
import MyTodo from "./Todo";

import { MyWorkingDayModels } from "./UserModel";
import { WorkSiteModels } from "./WorkSiteModel";

export default function Mypage() {
  const location = useLocation();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [selected, setSelected] = useState(new Date());
  const handleOnClickDay = (value: Date): void => {
    setSelected(value);
    // console.log(`handleOnClick ${value}`);
  };

  return (
    <Layout>
      {location.hash === "" && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} lg={5}>
            <Paper className={classes.paper}>
              <MyCalendar
                value={selected}
                handleOnClickDay={handleOnClickDay}
                workingDayModels={MyWorkingDayModels}
                workSiteModels={WorkSiteModels}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={7}>
            <Paper className={classes.paper}>
              <MyTaskCard
                value={selected}
                workingDayModels={MyWorkingDayModels}
                workSiteModels={WorkSiteModels}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <MyBacklog
                workingDayModels={MyWorkingDayModels}
                workSiteModels={WorkSiteModels}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      {location.hash === "#todo" && (
        <MyTodo
          value={new Date()}
          workingDayModels={MyWorkingDayModels}
          workSiteModels={WorkSiteModels}
        />
      )}
    </Layout>
  );
}
