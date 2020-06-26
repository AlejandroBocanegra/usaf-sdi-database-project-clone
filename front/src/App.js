import React from "react";
import "./App.css";
import "fontsource-roboto";
import CreateUser from "./components/CreateUser";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CreateManufacturer from "./components/CreateManufacturer";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Add from "@material-ui/icons/Add"
import Read from "@material-ui/icons/LocalLibrary"
import Update from "@material-ui/icons/SyncAlt"
import Delete from "@material-ui/icons/DeleteForever"
// import showAllUsers from "./components/showAllUsers"

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Database Project Front-End</Typography>
      <Container maxWidth="md">
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
              <CreateManufacturer name="Manufacturer" />
            </Paper>
            <Paper elevation={15} style={{ marginTop: "1rem" }}>
              <CreateManufacturer name="Customer" />
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* SPACER FOR SANITY */}
        <ExpansionPanel style={{ display: "block" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Read />
            <Typography>
              <b>R</b>ead
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            {/* CONTENT */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* SPACER FOR SANITY */}
        <ExpansionPanel style={{ display: "block" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Update />
            <Typography>
              <b>U</b>pdate
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            {/* CONTENT */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* SPACER FOR SANITY */}
        <ExpansionPanel style={{ display: "block" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Delete />
            <Typography>
              <b>D</b>elete
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: "block" }}>
            {/* CONTENT */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    </div>
  );
}

export default App;
