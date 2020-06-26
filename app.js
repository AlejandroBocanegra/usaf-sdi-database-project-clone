const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const db = require('./queries');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/* Get boilerplate:

app.get("/", (req,res) => {

})
?query - req.query.[KEY]
:id - req.params.[KEY]

app.post("/", (req,res) => {
    req.body.id ........

    res.sendStatus(200)
})

*/

app.post('/createUser', db.createUser);
app.post('/createManufacturer', db.createManufacturer);
app.post('/createCustomer', db.createCustomer);
app.delete('/deleteUser', db.deleteUser);
app.get ('/caveOfWonders', db.showAllTables);



const port = 9000;
app.listen(port, () => 
    console.log(`Database Project API listening on http://localhost:${port}`))
// database called commerce