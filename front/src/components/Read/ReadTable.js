import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

async function readData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    // body: JSON.stringify(data),
  });
  return response.json();
}

const ReadTable = () => {
  const classes = useStyles();
  const [Type, setType] = useState("");
  const [TableData, setTableData] = useState("");

  let selectType = (e) => {
    if (e.target.value.length) {
      setType(e.target.value);
    }
  };

  let submitRead = () => {
    readData(`http://localhost:9000/read/${Type}`).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      setTableData(data);
    });
  };

  let tableHead = () => {
    if (Type === "user") {
      return (
        <TableRow>
          <StyledTableCell align="left">ID</StyledTableCell>
          <StyledTableCell align="left">Last Name</StyledTableCell>
          <StyledTableCell align="left">First Name</StyledTableCell>
          <StyledTableCell align="left">Email</StyledTableCell>
        </TableRow>
      );
    } else if (Type === "manufacturer") {
      return (
        <TableRow>
          <StyledTableCell align="left">ID</StyledTableCell>
          <StyledTableCell align="left">Company Name</StyledTableCell>
          <StyledTableCell align="left">Contact Person</StyledTableCell>
          <StyledTableCell align="left">Contact Email</StyledTableCell>
          <StyledTableCell align="left">Contact Phone</StyledTableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <StyledTableCell align="left">ID</StyledTableCell>
          <StyledTableCell align="left">Last Name</StyledTableCell>
          <StyledTableCell align="left">First Name</StyledTableCell>
          <StyledTableCell align="left">Email</StyledTableCell>
        </TableRow>
      );
    }
  };

  let tableValues = () => {
    let outTable = [];
    for (let i = 0; i < TableData.length; i++) {
      for (let key in TableData[i]) {
        outTable.push(<StyledTableCell align="left">{TableData[i][key]}</StyledTableCell>);
      }
    }

    function chunkArray(myArray, chunk_size) {
      var results = [];
      while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
      }
      return results;
    }

    let tableRows = chunkArray(outTable, Object.keys(TableData[0]).length);
    console.log(TableData);
    return tableRows.map((ele) => <StyledTableRow>{ele}</StyledTableRow>);
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography style={{ display: "inline-block", paddingTop: "1rem" }} variant="h6">
          Show
        </Typography>
        <FormControl style={{ marginLeft: "1rem", minWidth: "80px" }}>
          <InputLabel htmlFor="type-select">Type</InputLabel>
          <Select labelId="type-select" onChange={selectType}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="user">Users</MenuItem>
            <MenuItem value="manufacturer">Manufacturers</MenuItem>
            <MenuItem value="purchaseOrder">Purchase Orders</MenuItem>
          </Select>
        </FormControl>
        <Typography style={{ display: "inline-block" }} variant="h6">
          :
        </Typography>
        <Button variant="contained" color="primary" onClick={submitRead}>
          Submit
        </Button>
      </form>
      {TableData !== "" && (
        <TableContainer component={Paper}>
          <Table>
            <caption>Pretty Cool!</caption>
            <TableHead>{tableHead()}</TableHead>
            <TableBody>{tableValues()}</TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

export default ReadTable;
