import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CreateUser = () => {
  const classes = useStyles();

  const [user, setuser] = useState(0);

  let onChange = (e) => {
      let id = e.target.id
      let newValue = {...user, [`${id}`]: e.target.value.trim() }
      setuser(newValue)
  }

  let submitTextfields = () => {
    console.log(user)
  }

  return (
    <React.Fragment>
      <Paper elevation={6}>
        <Typography variant="h6">Create User:</Typography>
      </Paper>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="firstName" label="First Name" onChange={onChange} />
        <TextField id="lastName" label="Last Name" onChange={onChange} />
        <TextField id="email" label="Email" onChange={onChange} />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={submitTextfields}
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default CreateUser;
