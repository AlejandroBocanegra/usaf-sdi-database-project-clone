import React from "react";
import CreateUser from "./CreateUser";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CreateBlock from "./CreateBlock";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add";

function Create() {
  return (
    <React.Fragment>
        <ExpansionPanel style={{ display: "block" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Add />
            <Typography>
              <b>C</b>reate
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            <Paper elevation={15}>
              <CreateUser />
            </Paper>
            <Paper elevation={15} style={{ marginTop: "1rem" }}>
              <CreateBlock name="Manufacturer" />
            </Paper>
            <Paper elevation={15} style={{ marginTop: "1rem" }}>
              <CreateBlock name="Customer" />
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </React.Fragment>
  );
}

export default Create;
