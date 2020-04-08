import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
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
              id="lastName"
              name="lastName"
              label="姓"
              fullWidth
              autoComplete="lname"
              value={props.user ? props.user.lastName : "LastName"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="名"
              fullWidth
              autoComplete="fname"
              value={props.user ? props.user.firstName : "FirstName"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastKana"
              name="lastKana"
              label="カナ(姓)"
              fullWidth
              value={props.user ? props.user.lastKana : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstKana"
              name="firstKana"
              label="カナ(名)"
              fullWidth
              value={props.user ? props.user.firstKana : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="displayName"
              name="displayName"
              label="表示名"
              fullWidth
              value={props.user ? props.user.displayName : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mailアドレス"
              fullWidth
              value={props.user ? props.user.email : "email address"}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {"更新"}
          </Button>
        </div>
      </Paper>
    </React.Fragment>
  );
}
