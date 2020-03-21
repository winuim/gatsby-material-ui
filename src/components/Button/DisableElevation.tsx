import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function DisableElevation() {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        DisableElevation
      </Typography>
      <Button variant="contained" color="primary" disableElevation>
        Disable elevation
      </Button>
    </div>
  );
}
