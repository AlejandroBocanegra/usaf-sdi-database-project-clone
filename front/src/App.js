import React from "react";
import "./App.css";
import "fontsource-roboto";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Create from "./components/Create/Create"
import Read from "./components/Read/Read"
import Update from "./components/Update/Update"
import Delete from "./components/Delete/Delete"
// import Change from "./components/Change";

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Database Project Front-End</Typography>
      <Container maxWidth="md">
        <Create />
        <Read />
        <Update />
        <Delete />
        {/* <Change name="User" method="GET" type="Update"/> */}
      </Container>
    </div>
  );
}

export default App;
