import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReadIcon from "@material-ui/icons/LocalLibrary"
import ReadTable from "./ReadTable";
import Paper from "@material-ui/core/Paper"

function Read() {
  return (
    <React.Fragment>
      <ExpansionPanel style={{ display: "block" }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <ReadIcon />
          <Typography>
            <b>R</b>ead
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block" }}>
          {/* CONTENT */}
          <Paper elevation={15} style={{ marginTop: "1rem" }}>
            <ReadTable />
          </Paper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );
}

export default Read;
