import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/DeleteForever"
import Paper from "@material-ui/core/Paper"
import DeleteByID from "./DeleteByID";

function Delete() {
  return (
    <React.Fragment>
      <ExpansionPanel style={{ display: "block" }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <DeleteIcon />
          <Typography>
            <b>D</b>elete
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block" }}>
          <Paper elevation={15} style={{ marginTop: "1rem" }}>
            <DeleteByID />
          </Paper>
          {/* CONTENT */}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default Delete;
