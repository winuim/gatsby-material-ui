import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useLocation } from "@reach/router";

import SEO from "../../components/Seo";
import ReactCalendar from "../../components/Calendar";
import Layout, { useStyles } from "../../layout/admin";

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [selected, setSelected] = useState(new Date());
  const handleOnClickDay = (value: Date): void => {
    console.debug(`handleOnClick(${value})`);
    setSelected(value);
  };

  return (
    <div>
      <SEO title="Admin page" />
      <Layout>
        {location.href === "" && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={6}>
              <Paper className={classes.paper}>
                <ReactCalendar
                  value={selected}
                  title="カレンダー"
                  handleOnClickDay={handleOnClickDay}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={classes.paper}>test</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>test</Paper>
            </Grid>
          </Grid>
        )}
      </Layout>
    </div>
  );
};

export default DashboardPage;
