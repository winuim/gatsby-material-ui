import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.defaultProps = {
  children: PropTypes.node,
};
