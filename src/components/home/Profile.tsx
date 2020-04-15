import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
  user: ProfileModelProps;
}

export default function MyProfile(props: Props): JSX.Element {
  const classes = useStyles();
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          プロフィール
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="uid"
              name="uid"
              label="UID"
              fullWidth
              value={user ? user.uid : "error"}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="displayName"
              name="displayName"
              label="表示名"
              fullWidth
              value={user ? user.displayName : "error"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mailアドレス"
              fullWidth
              value={user ? user.email : "error"}
            />
          </Grid>
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
