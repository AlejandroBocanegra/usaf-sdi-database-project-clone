import React from "react";
import "./App.css";
import "fontsource-roboto";
import CreateUser from "./components/CreateUser";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper"

function App() {
  return (
    <div className="App">
      <Typography variant="h2">SDI Front-End</Typography>
      <Container maxWidth="md">
        <Paper elevation={15}>
          <CreateUser />
        </Paper>
      </Container>
    </div>
  );
}

export default App;
