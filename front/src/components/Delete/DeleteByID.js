import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

async function deleteData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

const DeleteByID = () => {
  const classes = useStyles();

  const [item, setitem] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [status, setstatus] = useState(false);
  const [Type, setType] = useState("");

  let selectType = (e) => {
    if (e.target.value.length) {
      setType(e.target.value);
    }
  };

  let onChange = (e) => {
    let id = e.target.id;
    let newValue = { ...item, [`${id}`]: e.target.value.trim() };
    setitem(newValue);
  };

  let submitTextfields = () => {
    if (typeof item === "object") {
      deleteData(`http://localhost:9000/delete${Type}/${item.id}`, item).then(
        (data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          setstatus(data);
          setOpen(true);
        }
      );
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
      {/* <Paper elevation={6}>
        <Typography variant="h6">Create Item:</Typography>
      </Paper> */}
      <form className={classes.root} noValidate autoComplete="off">
        <Typography
          style={{ display: "inline-block", paddingTop: "1rem" }}
          variant="h6"
        >
          Delete
        </Typography>
        <FormControl style={{ marginLeft: "1rem", minWidth: "80px" }}>
          <InputLabel htmlFor="type-select">Type</InputLabel>
          <Select labelId="type-select" onChange={selectType}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="manufacturer">Manufacturer</MenuItem>
            <MenuItem value="purchaseOrder">Purchase Order</MenuItem>
          </Select>
        </FormControl>
        <Typography style={{ display: "inline-block" }} variant="h6">
          by
        </Typography>
        <TextField id="id" label="ID" onChange={onChange} />
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

export default DeleteByID;
