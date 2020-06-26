import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const CreateManufacturer = ({name}) => {
  const classes = useStyles();

  const [user, setuser] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setstatus] = useState(false);

  let onChange = (e) => {
    let id = e.target.id;
    let newValue = { ...user, [`${id}`]: e.target.value.trim() };
    setuser(newValue);
  };

  let submitTextfields = () => {
    if (typeof user === "object") {
      postData(`http://localhost:9000/create${name}`, user).then((data) => {
        console.log(data); // JSON data parsed by `data.json()` call
        setstatus(data);
        setOpen(true);
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Paper elevation={6}>
        <Typography variant="h6">Create {name}:</Typography>
      </Paper>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="company_name" label="Name" onChange={onChange} />
        <TextField id="contact_email" label="Email" onChange={onChange} />
        <TextField id="contact_person" label="Person" onChange={onChange} />
        <TextField id="contact_phone" label="Phone" onChange={onChange} />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={submitTextfields}
        >
          Submit
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {status}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default CreateManufacturer;
