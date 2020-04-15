import React, { useState } from "react";
import { navigate } from "gatsby";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "gatsby-plugin-firebase";

import Copyright from "../../components/Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface Props {
  success?: string;
  error?: string;
  signup?: string;
  forgot?: string;
}

interface State {
  email: string;
  password: string;
}

export default function SignInSide(props: Props): JSX.Element {
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
  });
  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // console.log(`${prop}: ${event.target.value}`);
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event): void => {
              event.preventDefault();
              firebase
                .auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                  navigate("/home");
                })
                .catch(function (error) {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  if (errorCode === "auth/wrong-password") {
                    alert("Wrong password.");
                  } else {
                    alert(errorMessage);
                  }
                  console.log(error);
                });
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              サインイン
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={props.forgot ? props.forgot : "#"} variant="body2">
                  {"サインインできない場合"}
                </Link>
              </Grid>
              <Grid item>
                <Link href={props.signup ? props.signup : "#"} variant="body2">
                  {"アカウントを作成"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
