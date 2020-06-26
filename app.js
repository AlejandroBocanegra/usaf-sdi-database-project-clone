const express = require("express");
const app = express();
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



const port = 9000;
app.listen(port, () => 
    console.log(`Database Project API listening on http://localhost:${port}`))
// database called commerce