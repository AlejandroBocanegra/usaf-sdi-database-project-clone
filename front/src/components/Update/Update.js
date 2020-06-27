import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import UpdateIcon from "@material-ui/icons/SyncAlt"

function Update() {
  return (
    <React.Fragment>
        <ExpansionPanel style={{ display: "block" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <UpdateIcon />
            <Typography>
              <b>U</b>pdate
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            {/* CONTENT */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </React.Fragment>
  );
}

export default Update;
