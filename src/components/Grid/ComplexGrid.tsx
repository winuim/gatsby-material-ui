import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
// import { useStaticQuery, graphql } from "gatsby";
// import Img, { FixedObject } from "gatsby-image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
  })
);

// interface Props {
//   file: {
//     childImageSharp: {
//       fixed: FixedObject;
//     };
//   };
// }

export default function ComplexGrid() {
  const classes = useStyles();
  // const data = useStaticQuery<Props>(graphql`
  //   query {
  //     file(relativePath: { eq: "images/grid/complex.jpg" }) {
  //       childImageSharp {
  //         # Specify the image processing specifications right in the query.
  //         # Makes it trivial to update as your page's design changes.
  //         fixed(width: 128, height: 128) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" gutterBottom>
        ComplexGrid
      </Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {/* <Img
                className={classes.img}
                alt="complex"
                fixed={data.file.childImageSharp.fixed}
              /> */}
              <img
                className={classes.img}
                alt="complex"
                src="/images/grid/complex.jpg"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
