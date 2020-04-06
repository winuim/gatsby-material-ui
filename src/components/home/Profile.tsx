import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { ProfileModel } from "../../model/EmployeeModel";

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

interface Props {
  user: ProfileModel;
}

export default function MyProfile(props: Props): JSX.Element {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          プロフィール
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="fname"
              value={props.user ? props.user.firstName : "FirstName"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="lname"
              value={props.user ? props.user.lastName : "LastName"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              fullWidth
              value={props.user ? props.user.email : "email address"}
            />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
